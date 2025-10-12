import { useRef } from 'react';
import type { DirectionalLight } from 'three';
import { DirectionalLightHelper } from 'three';
import { useHelper } from '@react-three/drei';

interface WorldLightsProps {
  debug?: boolean;
}

export const WorldLights = ({ debug = false }: WorldLightsProps) => {
  const dirLightRef = useRef<DirectionalLight>(null);
  useHelper(debug ? dirLightRef : undefined, DirectionalLightHelper, 10, '#00C2FF');

  return (
    <>
      <ambientLight intensity={0.6} color={0xffffff} />
      <directionalLight
        ref={dirLightRef}
        castShadow
        position={[10, 20, 10]}
        intensity={1}
        color={0xffffff}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
};

export default WorldLights;
