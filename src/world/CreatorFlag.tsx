import { useEffect, useMemo, useRef, useState } from 'react';
import { DoubleSide, MathUtils, Vector3 } from 'three';
import type { Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { Billboard, Html, Text } from '@react-three/drei';
import { useWorldStore } from '@store/worldStore';
import type { AppItem } from '@types/app';
import type { Mesh, MeshStandardMaterial } from 'three';

interface CreatorFlagProps {
  app: AppItem;
}

export const CreatorFlag = ({ app }: CreatorFlagProps) => {
  const selectApp = useWorldStore((state) => state.selectApp);
  const selectedAppId = useWorldStore((state) => state.selectedAppId);
  const triggerSfx = useWorldStore((state) => state.triggerSfx);
  const infoPanelOpen = useWorldStore((state) => Boolean(state.selectedAppId));

  const [hovered, setHovered] = useState(false);

  const flagRef = useRef<Mesh>(null);
  const shimmerRef = useRef<Mesh>(null);
  const rootRef = useRef<Group>(null);
  const scaleTarget = useRef(new Vector3(1, 1, 1));

  const position = useMemo(() => new Vector3(...app.position), [app.position]);
  const selected = selectedAppId === app.id;

  useEffect(() => {
    if (infoPanelOpen && !selected) {
      setHovered(false);
    }
  }, [infoPanelOpen, selected]);

  useFrame(({ clock, camera }) => {
    const root = rootRef.current;
    if (root) {
      const distance = camera.position.distanceTo(position);
      const referenceDistance = 42;
      const scale = MathUtils.clamp(referenceDistance / Math.max(distance, 1), 0.75, 2.3);
      scaleTarget.current.setScalar(scale);
      root.scale.lerp(scaleTarget.current, 0.12);
    }
    const flag = flagRef.current;
    const shimmer = shimmerRef.current;
    if (flag) {
      const baseRotation = Math.PI / 8;
      flag.rotation.y = baseRotation + Math.sin(clock.elapsedTime * 1.4) * 0.1;
    }
    if (shimmer) {
      const material = shimmer.material as MeshStandardMaterial;
      material.opacity = MathUtils.lerp(
        material.opacity,
        selected ? 0.5 : hovered ? 0.35 : 0.18,
        0.08
      );
    }
  });

  const pointerEnabled = !infoPanelOpen || selected;

  const handleHover = (state: boolean) => {
    if (!pointerEnabled) return;
    setHovered(state);
    if (state) {
      triggerSfx('hover');
    }
  };

  const handleSelect = () => {
    if (!pointerEnabled) return;
    selectApp(app.id);
    triggerSfx('select');
  };

  const flagColor = selected ? '#5eead4' : hovered ? '#22d3ee' : '#0f766e';
  const textColor = selected ? '#052e1c' : '#e0f2f1';
  const badgeLabel = app.tags[0] ?? 'About';
  const baseOpacity = infoPanelOpen && !selected ? 0.3 : 0.9;

  return (
    <group ref={rootRef} position={[position.x, 1.5, position.z + 0.6]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        ref={shimmerRef}
      >
        <circleGeometry args={[1.25, 48]} />
        <meshStandardMaterial
          color={selected ? '#5eead4' : '#1e293b'}
          transparent
          opacity={selected ? 0.45 : hovered ? 0.3 : 0.22}
        />
      </mesh>

      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 4.6, 22]} />
        <meshStandardMaterial color="#f0fdf4" emissive={selected ? '#4ade80' : '#0f172a'} emissiveIntensity={selected ? 0.4 : 0.15} />
      </mesh>

      <mesh
        ref={flagRef}
        position={[1.7, 4, 0]}
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
        onClick={handleSelect}
      >
        <planeGeometry args={[3.9, 2.4]} />
        <meshStandardMaterial
          color={flagColor}
          side={DoubleSide}
          transparent
          opacity={baseOpacity}
          roughness={0.5}
          metalness={0.2}
        />
        <Billboard position={[0, 0, 0.02]} follow={false} lockZ>
          <Text
            color={textColor}
            fontSize={0.46}
            maxWidth={3}
            anchorX="center"
            anchorY="middle"
            lineHeight={1.25}
          >
            {app.title}
          </Text>
        </Billboard>
      </mesh>

      <Html className="pointer-events-none" position={[1.2, 1.2, 0]} distanceFactor={14}>
        <div className="select-none rounded-full border border-emerald-400/50 bg-emerald-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-200 shadow">
          {badgeLabel}
        </div>
      </Html>

      <Html className="pointer-events-none" position={[1.4, 3.6, 0]} distanceFactor={16}>
        <div className="max-w-[180px] rounded-xl border border-emerald-400/40 bg-emerald-950/80 px-3 py-2 text-[11px] leading-tight text-emerald-100 shadow-[0_12px_30px_rgba(6,95,70,0.35)]">
          <p className="font-semibold text-emerald-200">Systems ✦ Story ✦ AI</p>
          <p className="mt-1 text-emerald-100/80">
            Spatial engineer weaving automation, creative tooling, and mentorship.
          </p>
        </div>
      </Html>
    </group>
  );
};

export default CreatorFlag;
