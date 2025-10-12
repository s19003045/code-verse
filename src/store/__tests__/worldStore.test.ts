import { describe, expect, beforeEach, it } from 'vitest';
import { useWorldStore } from '../worldStore';
import type { AppItem } from '@types/app';

const sampleApps: AppItem[] = [
  {
    id: 'alpha-zone',
    title: 'Alpha Zone',
    description: 'Test experience',
    tags: ['Test'],
    position: [0, 0, 0],
    icon: '/cards/test.png',
    link: 'https://example.com'
  },
  {
    id: 'beta-hub',
    title: 'Beta Hub',
    description: 'Second test',
    tags: ['QA'],
    position: [5, 0, 5],
    icon: '/cards/test2.png',
    link: 'https://example.com/beta'
  }
];

describe('useWorldStore', () => {
  beforeEach(() => {
    useWorldStore.setState((state) => ({
      ...state,
      apps: [],
      appsLoaded: false,
      selectedAppId: null,
      muted: false,
      cameraMode: 'desktop',
      cameraPosition: [0, 60, 100],
      cameraLookAt: [0, 0, 0]
    }));
  });

  it('stores apps in alphabetical order', () => {
    useWorldStore.getState().setApps(sampleApps);
    const apps = useWorldStore.getState().apps;
    expect(apps.map((app) => app.id)).toEqual(['alpha-zone', 'beta-hub']);
  });

  it('toggles mute state', () => {
    expect(useWorldStore.getState().muted).toBe(false);
    useWorldStore.getState().toggleMuted();
    expect(useWorldStore.getState().muted).toBe(true);
  });

  it('updates camera mode and presets', () => {
    useWorldStore.getState().setCameraMode('mobile');
    const state = useWorldStore.getState();
    expect(state.cameraMode).toBe('mobile');
    expect(state.cameraPosition).toEqual([0, 30, 60]);
  });

  it('teleports camera near the selected position', () => {
    useWorldStore.getState().teleportTo([10, 0, -10]);
    const { cameraPosition, cameraLookAt } = useWorldStore.getState();
    expect(cameraLookAt).toEqual([10, 0, -10]);
    expect(cameraPosition[0]).toBeCloseTo(10);
  });
});
