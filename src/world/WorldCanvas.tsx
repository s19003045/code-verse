import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { COLORS } from '@theme/colors';
import { useWorldStore } from '@store/worldStore';
import WorldMap from './WorldMap';
import WorldLights from './WorldLights';
import ApplicationLayer from './ApplicationLayer';
import CameraController from './CameraController';
import FpsMeter from './FpsMeter';

export const WorldCanvas = () => {
  const lowPowerMode = useWorldStore((state) => state.lowPowerMode);

  const devicePixelRatio = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    const base = Math.min(window.devicePixelRatio, 2);
    return lowPowerMode ? Math.min(base, 1) : base;
  }, [lowPowerMode]);

  return (
    <Canvas shadows={!lowPowerMode} camera={{ position: [0, 60, 100], fov: 45 }} dpr={devicePixelRatio}>
      <color attach="background" args={[COLORS.background]} />
      {!lowPowerMode ? <fog attach="fog" args={[COLORS.background, 40, 180]} /> : null}
      <Suspense fallback={null}>
        <WorldLights />
        <WorldMap />
        <ApplicationLayer />
      </Suspense>
      <CameraController />
      <FpsMeter />
    </Canvas>
  );
};

export default WorldCanvas;
