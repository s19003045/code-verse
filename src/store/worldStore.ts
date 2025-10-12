import { create } from 'zustand';
import type { AppItem, CameraMode, CameraPreset, Vec3 } from '@types/app';

const CAMERA_PRESETS: Record<CameraMode, CameraPreset> = {
  desktop: { position: [0, 60, 100], lookAt: [0, 0, 0] },
  tablet: { position: [0, 45, 80], lookAt: [0, 0, 0] },
  mobile: { position: [0, 30, 60], lookAt: [0, 0, 0] }
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const equals = (a: Vec3, b: Vec3) => a.every((value, index) => Math.abs(value - b[index]) < 0.01);

interface WorldState {
  apps: AppItem[];
  appsLoaded: boolean;
  selectedAppId: string | null;
  muted: boolean;
  cameraMode: CameraMode;
  cameraPosition: Vec3;
  cameraLookAt: Vec3;
  fps: number;
  autoMode: boolean;
  autoIndex: number;
  sfxEvent: { id: string; version: number } | null;
  lowPowerMode: boolean;
  setApps: (apps: AppItem[]) => void;
  selectApp: (id: string | null) => void;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
  setCameraMode: (mode: CameraMode) => void;
  updateCameraPose: (position: Vec3, lookAt?: Vec3) => void;
  teleportTo: (position: Vec3) => void;
  setFps: (fps: number) => void;
  setAutoMode: (enabled: boolean) => void;
  advanceAutoIndex: () => void;
  triggerSfx: (id: string) => void;
  resetCamera: () => void;
  toggleLowPowerMode: () => void;
}

export const useWorldStore = create<WorldState>((set, get) => ({
  apps: [],
  appsLoaded: false,
  selectedAppId: null,
  muted: false,
  cameraMode: 'desktop',
  cameraPosition: CAMERA_PRESETS.desktop.position,
  cameraLookAt: CAMERA_PRESETS.desktop.lookAt,
  fps: 0,
  autoMode: false,
  autoIndex: 0,
  sfxEvent: null,
  lowPowerMode: false,
  setApps: (apps) =>
    set({
      apps: apps.sort((a, b) => a.title.localeCompare(b.title)),
      appsLoaded: true
    }),
  selectApp: (id) => set({ selectedAppId: id }),
  setMuted: (muted) => set({ muted }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
  setCameraMode: (mode) => {
    const preset = CAMERA_PRESETS[mode];
    set({ cameraMode: mode, cameraPosition: preset.position, cameraLookAt: preset.lookAt });
  },
  updateCameraPose: (position, lookAt) =>
    set((state) => {
      const targetLookAt = lookAt ?? state.cameraLookAt;
      if (equals(state.cameraPosition, position) && equals(state.cameraLookAt, targetLookAt)) {
        return state;
      }
      return { cameraPosition: position, cameraLookAt: targetLookAt };
    }),
  teleportTo: (position) => {
    const height = clamp(position[1] + 30, 20, 80);
    set({
      cameraPosition: [position[0], height, position[2] + 35],
      cameraLookAt: position
    });
  },
  setFps: (fps) => set({ fps }),
  setAutoMode: (enabled) => set({ autoMode: enabled, autoIndex: 0 }),
  advanceAutoIndex: () => set((state) => ({ autoIndex: state.autoIndex + 1 })),
  triggerSfx: (id) =>
    set((state) => ({ sfxEvent: { id, version: state.sfxEvent ? state.sfxEvent.version + 1 : 1 } })),
  resetCamera: () => {
    const preset = CAMERA_PRESETS[get().cameraMode];
    set({ cameraPosition: preset.position, cameraLookAt: preset.lookAt });
  },
  toggleLowPowerMode: () => set((state) => ({ lowPowerMode: !state.lowPowerMode }))
}));

export const getCameraPreset = (mode: CameraMode) => CAMERA_PRESETS[mode];
