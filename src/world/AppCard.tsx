import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Billboard, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import type { Mesh, MeshBasicMaterial } from 'three';
import type { AppItem } from '@types/app';
import { useWorldStore } from '@store/worldStore';

const VISIBLE_DISTANCE = 55;

interface AppCardProps {
  app: AppItem;
}

const AppCardComponent = ({ app }: AppCardProps) => {
  const camera = useThree((state) => state.camera);
  const selectApp = useWorldStore((state) => state.selectApp);
  const selectedAppId = useWorldStore((state) => state.selectedAppId);
  const triggerSfx = useWorldStore((state) => state.triggerSfx);
  const infoPanelOpen = useWorldStore((state) => Boolean(state.selectedAppId));
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  const targetPosition = useMemo(() => new Vector3(...app.position), [app.position]);

  const planeRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  const selected = selectedAppId === app.id;

  useEffect(() => {
    if (infoPanelOpen) {
      setHovered(false);
    }
  }, [infoPanelOpen]);

  const cardStyle = useMemo(() => {
    const dimmed = infoPanelOpen && !selected;
    return {
      background: 'rgba(15, 25, 40, 0.85)',
      border: hovered ? '1px solid #00C2FF' : '1px solid rgba(148, 163, 184, 0.35)',
      borderRadius: '12px',
      padding: '0.75rem',
      minWidth: '200px',
      transition: 'all 0.2s ease',
      boxShadow: hovered
        ? '0 0 22px rgba(0, 194, 255, 0.35)'
        : '0 4px 16px rgba(2, 12, 27, 0.55)',
      opacity: dimmed ? 0.2 : 1,
      filter: dimmed ? 'blur(1px)' : 'none',
      pointerEvents: infoPanelOpen ? 'none' : 'auto'
    };
  }, [hovered, infoPanelOpen, selected]);

  useFrame(() => {
    const distance = camera.position.distanceTo(targetPosition);
    const shouldShow = distance < VISIBLE_DISTANCE;
    setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
  });

  useFrame(() => {
    const plane = planeRef.current;
    const glow = glowRef.current;
    const targetScale = infoPanelOpen && !selected ? 0.85 : hovered || selected ? 1.15 : 1;
    if (plane) {
      const next = MathUtils.lerp(plane.scale.x, targetScale, 0.18);
      plane.scale.set(next, next, 1);
    }
    if (glow) {
      const opacityTarget = infoPanelOpen && !selected ? 0.2 : hovered || selected ? 0.9 : 0.35;
      const material = glow.material as MeshBasicMaterial;
      material.opacity = MathUtils.lerp(material.opacity, opacityTarget, 0.2);
      const glowTargetScale = infoPanelOpen && !selected ? 0.9 : hovered || selected ? 1.35 : 1.1;
      glow.scale.setScalar(MathUtils.lerp(glow.scale.x, glowTargetScale, 0.15));
    }
  });

  const handleClick = () => {
    selectApp(app.id);
    triggerSfx('select');
  };

  return (
    <group position={[app.position[0], 2.6, app.position[2]]} visible={visible}>
      <Billboard follow={false} lockX lockY>
        <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.2, 0]}
        >
          <ringGeometry args={[1.6, 2.1, 32]} />
          <meshBasicMaterial color={selected ? '#00C2FF' : '#FFD166'} transparent opacity={0.35} />
        </mesh>
        <mesh ref={planeRef}>
          <planeGeometry args={[5, 3]} />
          <meshStandardMaterial
            color={hovered || selected ? '#13263d' : '#101b2b'}
            transparent
            opacity={0.7}
            emissive={selected ? '#00C2FF' : '#0b1628'}
            emissiveIntensity={selected ? 0.6 : 0.2}
          />
        </mesh>
        <Html
          transform
          position={[0, 0, 0.02]}
          distanceFactor={8}
          className={infoPanelOpen ? 'pointer-events-none' : 'pointer-events-auto'}
          zIndexRange={[0, 0]}
        >
          <article
            style={cardStyle}
            onMouseEnter={() => {
              setHovered(true);
              triggerSfx('hover');
            }}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
          >
            <header className="flex items-center gap-2">
              <div className="h-8 w-8 shrink-0 rounded-md bg-cosmos/40 border border-aurora/50 flex items-center justify-center text-xs uppercase tracking-wide text-aurora">
                {app.region?.slice(0, 2) ?? 'CV'}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">{app.title}</h3>
                <p className="text-[11px] text-slate-400">{app.tags.slice(0, 2).join(' · ')}</p>
              </div>
            </header>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {app.description.length > 110 ? `${app.description.slice(0, 107)}…` : app.description}
            </p>
            <footer className="mt-3 flex items-center justify-between text-[11px] text-aurora">
              <span>View Details</span>
              <span className="text-slate-400">↗</span>
            </footer>
          </article>
        </Html>
      </Billboard>
    </group>
  );
};

export const AppCard = memo(AppCardComponent);
