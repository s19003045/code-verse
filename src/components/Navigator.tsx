import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWorldStore } from '@store/worldStore';
import AudioToggle from './AudioToggle';
import MiniMap from './MiniMap';
import useIsMobile from '@hooks/useIsMobile';

const normalise = (value: string) => value.toLowerCase().trim();
const CREATOR_ID = 'creator-garywu';

const vibrate = (pattern: number | number[] = 16) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

interface NavigatorProps {
  loading?: boolean;
}

export const Navigator = ({ loading = false }: NavigatorProps) => {
  const apps = useWorldStore((state) => state.apps);
  const teleportTo = useWorldStore((state) => state.teleportTo);
  const selectApp = useWorldStore((state) => state.selectApp);
  const fps = useWorldStore((state) => state.fps);
  const cameraMode = useWorldStore((state) => state.cameraMode);
  const autoMode = useWorldStore((state) => state.autoMode);
  const setAutoMode = useWorldStore((state) => state.setAutoMode);
  const triggerSfx = useWorldStore((state) => state.triggerSfx);
  const resetCamera = useWorldStore((state) => state.resetCamera);
  const lowPowerMode = useWorldStore((state) => state.lowPowerMode);
  const toggleLowPowerMode = useWorldStore((state) => state.toggleLowPowerMode);
  const selectedAppId = useWorldStore((state) => state.selectedAppId);
  const appsLoaded = useWorldStore((state) => state.appsLoaded);

  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isMiniMapOpen, setMiniMapOpen] = useState(false);
  const isMobile = useIsMobile();

  const creatorApp = useMemo(() => apps.find((app) => app.id === CREATOR_ID), [apps]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    apps
      .filter((app) => app.id !== CREATOR_ID)
      .forEach((app) => app.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [apps]);

  const filteredApps = useMemo(() => {
    const normalisedQuery = normalise(query);
    return apps.filter((app) => {
      if (app.id === CREATOR_ID) {
        return false;
      }
      const matchesQuery =
        !normalisedQuery ||
        normalise(app.title).includes(normalisedQuery) ||
        normalise(app.description).includes(normalisedQuery);
      const matchesTag = !activeTag || app.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [apps, query, activeTag]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (autoMode) {
      setAutoMode(false);
    }
    setQuery(event.target.value);
  };

  const handleTagToggle = (tag: string) => {
    if (autoMode) {
      setAutoMode(false);
    }
    setActiveTag((current) => (current === tag ? null : tag));
  };

  const handleTeleport = (appId: string) => {
    const app = apps.find((item) => item.id === appId);
    if (!app) return;
    if (autoMode) {
      setAutoMode(false);
    }
    teleportTo(app.position);
    selectApp(app.id);
    triggerSfx('teleport');
    vibrate([12, 8]);
    setMiniMapOpen(false);
    setSheetOpen(false);
  };

  const handleAutoToggle = () => {
    setAutoMode(!autoMode);
    triggerSfx('select');
    vibrate(12);
  };

  const handleToggleLowPower = () => {
    toggleLowPowerMode();
    triggerSfx('hover');
    vibrate(10);
  };

  const handleResetView = () => {
    if (autoMode) {
      setAutoMode(false);
    }
    resetCamera();
    triggerSfx('teleport');
    vibrate([14, 8, 14]);
    setMiniMapOpen(false);
  };

  const handleNextProject = () => {
    if (filteredApps.length === 0) return;
    const currentIndex = filteredApps.findIndex((app) => app.id === selectedAppId);
    const nextApp = filteredApps[(currentIndex + 1) % filteredApps.length];
    handleTeleport(nextApp.id);
  };

  const renderAutoTourButton = (compact = false) => (
    <button
      type="button"
      onClick={handleAutoToggle}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
        autoMode
          ? 'border-aurora bg-aurora/20 text-aurora'
          : 'border-slate-600/70 bg-slate-950/60 text-slate-200 hover:border-aurora/70 hover:text-aurora'
      }`}
    >
      <span aria-hidden>{autoMode ? '🛰️' : '🧭'}</span>
      <span>{compact ? (autoMode ? 'Auto ON' : 'Auto') : autoMode ? 'Auto Tour: ON' : 'Auto Tour'}</span>
    </button>
  );

  const renderLowPowerButton = (compact = false) => (
    <button
      type="button"
      onClick={handleToggleLowPower}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
        lowPowerMode
          ? 'border-aurora bg-aurora/10 text-aurora'
          : 'border-slate-600/70 bg-slate-950/60 text-slate-200 hover:border-aurora/70 hover:text-aurora'
      }`}
    >
      <span aria-hidden>{lowPowerMode ? '🌙' : '⚡'}</span>
      <span>{compact ? (lowPowerMode ? 'Eco' : 'Perf') : lowPowerMode ? 'Eco Mode' : 'Performance'}</span>
    </button>
  );

  const searchField = (
    <input
      type="search"
      placeholder="Search experiences..."
      value={query}
      onChange={handleSearchChange}
      className="w-full rounded-lg border border-slate-600/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-aurora/80 focus:outline-none"
    />
  );

  const tagList = (
    <div className="flex flex-wrap gap-2" data-testid="tag-grid">
      {tags.map((tag) => {
        const selected = activeTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagToggle(tag)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              selected
                ? 'border-aurora bg-aurora/20 text-aurora'
                : 'border-slate-600/70 bg-slate-900/40 text-slate-300 hover:border-aurora/60 hover:text-aurora'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );

  const projectButtons = (
    <div className="flex flex-wrap gap-2" data-testid="teleport-grid">
      {filteredApps.slice(0, 8).map((app) => (
        <button
          key={app.id}
          type="button"
          onClick={() => handleTeleport(app.id)}
          className="rounded-lg border border-slate-600/60 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 transition hover:border-aurora/70 hover:text-aurora"
        >
          {app.title}
        </button>
      ))}
    </div>
  );

  const creatorButton = creatorApp ? (
    <div className="rounded-2xl border border-emerald-500/40 bg-emerald-900/25 p-4 text-emerald-100 shadow-[0_20px_40px_rgba(15,118,110,0.15)]">
      <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-300/80">Creator Node</p>
      <h4 className="mt-1 text-sm font-semibold text-emerald-100">{creatorApp.title}</h4>
      <p className="mt-1 text-xs text-emerald-200/80">
        Systems strategist fusing engineering rigor, product orchestration, and narrative design.
      </p>
      <button
        type="button"
        onClick={() => handleTeleport(creatorApp.id)}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-400/95 px-3 py-2 text-xs font-semibold text-emerald-950 transition hover:bg-emerald-300"
      >
        Meet Gary Wu
        <span aria-hidden>↗</span>
      </button>
    </div>
  ) : null;

  const isLoading = loading || !appsLoaded;

  if (isLoading) {
    return (
      <div
        data-testid="loading-skeleton"
        className="pointer-events-auto w-full rounded-2xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 backdrop-blur"
      >
        <div className="animate-pulse space-y-4">
          <div className="flex gap-2">
            <div className="h-10 flex-1 rounded-lg bg-slate-700/40" />
            <div className="h-10 w-10 rounded-lg bg-slate-700/30" />
            <div className="h-10 w-16 rounded-lg bg-slate-700/30" />
          </div>
          <div className="h-36 rounded-2xl bg-slate-700/20" />
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/80 px-3 py-2 backdrop-blur">
          <button
            type="button"
            className="rounded-lg border border-slate-600/70 px-3 py-2 text-xs text-slate-200"
            onClick={() => setMiniMapOpen(true)}
          >
            Map
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg border border-aurora/40 bg-aurora/15 px-3 py-2 text-xs font-semibold text-aurora shadow-[0_0_12px_rgba(0,194,255,0.25)]"
            onClick={() => setSheetOpen(true)}
          >
            Browse Projects
          </button>
          {renderLowPowerButton(true)}
          <AudioToggle />
          {renderAutoTourButton(true)}
        </div>

        <AnimatePresence>
          {isSheetOpen ? (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="pointer-events-auto fixed inset-x-0 bottom-0 z-40 rounded-t-3xl border border-slate-700/70 bg-slate-900/95 px-4 pb-8 pt-4 backdrop-blur"
            >
              <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-600/60" />
              <div className="mt-4 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-200">Project Navigator</h2>
                <button
                  type="button"
                  className="rounded-md border border-slate-600/70 px-2 py-1 text-xs text-slate-300"
                  onClick={() => setSheetOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="mt-4 space-y-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                {searchField}
                {tagList}
                {projectButtons}
                {creatorButton}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {isMiniMapOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                className="w-[88vw] max-w-sm rounded-3xl border border-slate-700/70 bg-slate-900/90 p-4 shadow-2xl"
              >
                <MiniMap className="h-[60vw] min-h-[220px] w-full" onTeleport={handleTeleport} />
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg border border-slate-600/70 px-3 py-2 text-sm text-slate-200"
                  onClick={() => setMiniMapOpen(false)}
                >
                  Close Map
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!isSheetOpen && !isMiniMapOpen ? (
          <div className="pointer-events-auto fixed bottom-24 right-4 z-30 flex flex-col gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-600/70 bg-slate-950/70 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur transition hover:border-aurora/70 hover:text-aurora"
              onClick={handleResetView}
            >
              Reset View
            </button>
            {filteredApps.length > 0 ? (
              <button
                type="button"
                className="rounded-full border border-slate-600/70 bg-slate-950/70 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur transition hover:border-aurora/70 hover:text-aurora"
                onClick={handleNextProject}
              >
                Next Project
              </button>
            ) : null}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div className="pointer-events-auto flex w-full max-h-[72vh] flex-col gap-3 overflow-y-auto rounded-2xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px]">{searchField}</div>
        <AudioToggle />
        {renderLowPowerButton()}
        {renderAutoTourButton()}
        <div className="rounded-lg border border-slate-600/70 px-3 py-2 text-xs text-slate-300">
          {cameraMode.toUpperCase()} • {fps || '—'} FPS
        </div>
      </div>

      <div className="flex flex-wrap gap-4 overflow-visible">
        <MiniMap onTeleport={handleTeleport} />
        <div className="flex-1 min-w-[240px] space-y-3">
          {tagList}
          {projectButtons}
          {creatorButton}
        </div>
      </div>
    </div>
  );
};

export default Navigator;
