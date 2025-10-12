import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWorldStore } from '@store/worldStore';

export const FpsMeter = () => {
  const setFps = useWorldStore((state) => state.setFps);
  const elapsedRef = useRef(0);
  const framesRef = useRef(0);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    framesRef.current += 1;

    if (elapsedRef.current >= 0.5) {
      const fps = Math.round(framesRef.current / elapsedRef.current);
      setFps(fps);
      elapsedRef.current = 0;
      framesRef.current = 0;
    }
  });

  return null;
};

export default FpsMeter;
