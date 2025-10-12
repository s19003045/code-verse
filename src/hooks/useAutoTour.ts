import { useEffect, useRef } from 'react';
import { useWorldStore } from '@store/worldStore';

const TOUR_INTERVAL_MS = 6000;

export const useAutoTour = () => {
  const autoMode = useWorldStore((state) => state.autoMode);
  const apps = useWorldStore((state) => state.apps);
  const autoIndex = useWorldStore((state) => state.autoIndex);
  const advanceAutoIndex = useWorldStore((state) => state.advanceAutoIndex);
  const teleportTo = useWorldStore((state) => state.teleportTo);
  const selectApp = useWorldStore((state) => state.selectApp);
  const triggerSfx = useWorldStore((state) => state.triggerSfx);

  const indexRef = useRef(autoIndex);

  useEffect(() => {
    indexRef.current = autoIndex;
  }, [autoIndex]);

  useEffect(() => {
    if (!autoMode || apps.length === 0) {
      return undefined;
    }

    const cycle = () => {
      const index = indexRef.current % apps.length;
      const app = apps[index];
      teleportTo(app.position);
      selectApp(app.id);
      triggerSfx('teleport');
      advanceAutoIndex();
    };

    cycle();

    const timer = setInterval(cycle, TOUR_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [autoMode, apps, teleportTo, selectApp, advanceAutoIndex, triggerSfx]);
};

export default useAutoTour;
