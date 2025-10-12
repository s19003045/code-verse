import { memo, useMemo } from 'react';
import { useWorldStore } from '@store/worldStore';
import type { Vec3 } from '@types/app';

const MAP_SIZE = 120;

interface MiniMapProps {
  onTeleport: (position: Vec3, id: string) => void;
  className?: string;
}

const toPercent = (value: number) => ((value + MAP_SIZE / 2) / MAP_SIZE) * 100;

export const MiniMap = memo(({ onTeleport, className }: MiniMapProps) => {
  const apps = useWorldStore((state) => state.apps);
  const cameraPosition = useWorldStore((state) => state.cameraPosition);
  const selectedAppId = useWorldStore((state) => state.selectedAppId);

  const markers = useMemo(
    () =>
      apps.map((app) => ({
        id: app.id,
        label: app.title,
        left: `${toPercent(app.position[0])}%`,
        top: `${100 - toPercent(app.position[2])}%`
      })),
    [apps]
  );

  const cameraMarker = useMemo(
    () => ({
      left: `${toPercent(cameraPosition[0])}%`,
      top: `${100 - toPercent(cameraPosition[2])}%`
    }),
    [cameraPosition]
  );

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/80 shadow-lg ${
        className ?? 'h-40 w-40'
      }`}
      style={{ backgroundImage: "url('/textures/codeverse_map.png')", backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-[#050b16]/10 to-slate-950/55" />
      {markers.map((marker) => (
        <button
          key={marker.id}
          type="button"
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-2 py-1 text-[10px] font-medium backdrop-blur transition ${
            marker.id === selectedAppId
              ? 'border-aurora bg-aurora/30 text-slate-950'
              : 'border-slate-700/70 bg-slate-900/80 text-slate-200 hover:border-aurora/70 hover:text-aurora'
          }`}
          style={{ left: marker.left, top: marker.top }}
          onClick={() => {
            const target = apps.find((app) => app.id === marker.id);
            if (!target) return;
            onTeleport(target.position, target.id);
          }}
        >
          {marker.label.slice(0, 8)}
        </button>
      ))}
      <div
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-aurora bg-white"
        style={{ left: cameraMarker.left, top: cameraMarker.top }}
        aria-hidden
      />
      <div className="absolute bottom-2 right-2 rounded-md border border-slate-700/70 bg-slate-900/80 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-300">
        Mini Map
      </div>
    </div>
  );
});

MiniMap.displayName = 'MiniMap';

export default MiniMap;
