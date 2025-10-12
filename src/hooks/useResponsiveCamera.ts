import { useEffect } from 'react';
import { useWorldStore } from '@store/worldStore';
import type { CameraMode } from '@types/app';

const TABLET_BREAKPOINT = 1024;
const MOBILE_BREAKPOINT = 640;

const resolveMode = (width: number): CameraMode => {
  if (width < MOBILE_BREAKPOINT) return 'mobile';
  if (width < TABLET_BREAKPOINT) return 'tablet';
  return 'desktop';
};

export const useResponsiveCamera = () => {
  const setCameraMode = useWorldStore((state) => state.setCameraMode);

  useEffect(() => {
    const updateMode = () => {
      const mode = resolveMode(window.innerWidth);
      setCameraMode(mode);
    };

    updateMode();
    window.addEventListener('resize', updateMode);
    return () => window.removeEventListener('resize', updateMode);
  }, [setCameraMode]);
};
