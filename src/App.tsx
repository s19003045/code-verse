import { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigator from '@components/Navigator';
import InfoPanel from '@components/InfoPanel';
import { useLoadApps } from '@hooks/useLoadApps';
import { useResponsiveCamera } from '@hooks/useResponsiveCamera';
import { useAmbientAudio } from '@hooks/useAmbientAudio';
import { useAutoTour } from '@hooks/useAutoTour';
import { useSoundEffects } from '@hooks/useSoundEffects';
import { useWorldStore } from '@store/worldStore';

const WorldCanvas = lazy(() => import('@world/WorldCanvas'));

const HUDLabel = () => (
  <div className="pointer-events-auto rounded-full border border-aurora/50 bg-cosmos/60 px-4 py-1 text-sm font-semibold text-aurora shadow-lg">
    CodeVerse Navigator
  </div>
);

const LoadingOverlay = () => (
  <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/80 backdrop-blur">
    <div className="flex flex-col items-center gap-3 text-slate-200">
      <div className="size-12 animate-spin rounded-full border-2 border-aurora/40 border-t-aurora" />
      <p className="text-sm tracking-wide text-slate-300">Generating your universe...</p>
      <div className="mt-4 w-64 animate-pulse space-y-2 text-left">
        <div className="h-3 w-44 rounded-full bg-slate-700/40" />
        <div className="h-3 w-56 rounded-full bg-slate-700/30" />
        <div className="h-3 w-32 rounded-full bg-slate-700/25" />
      </div>
    </div>
  </div>
);

const ErrorBanner = ({ message }: { message: string }) => (
  <div className="pointer-events-auto rounded-lg border border-red-500/50 bg-red-900/40 px-4 py-3 text-sm text-red-100 shadow-lg">
    {message}
  </div>
);

const WorldFallback = () => (
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950">
    <div className="animate-pulse rounded-full border border-slate-800/80 px-4 py-2 text-xs font-semibold tracking-wide text-slate-400">
      Loading immersive scene…
    </div>
  </div>
);

const App = () => {
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [allowHint, setAllowHint] = useState(false);
  const onboardingKey = 'codeverse:onboarding:v1';
  const apps = useWorldStore((state) => state.apps);
  const onboardingSpotlight = apps.slice(0, 3);
  const { loading } = useLoadApps({
    onError: (err) => setError(err.message)
  });

  useResponsiveCamera();
  useAmbientAudio();
  useAutoTour();
  useSoundEffects();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem(onboardingKey);
    if (!seen) {
      setShowOnboarding(true);
    } else {
      setAllowHint(true);
    }
  }, [onboardingKey]);

  const dismissOnboarding = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(onboardingKey, 'seen');
      if ('vibrate' in navigator) navigator.vibrate?.(12);
    }
    setShowOnboarding(false);
    setAllowHint(true);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Suspense fallback={<WorldFallback />}>
        <WorldCanvas />
      </Suspense>
      {loading ? <LoadingOverlay /> : null}

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="pointer-events-auto">
            <h1 className="text-3xl font-semibold text-slate-100">CodeVerse</h1>
            <p className="text-sm text-slate-400">Spatial portfolio engineered by Gary Wu • React • Three.js • Spec-driven systems</p>
          </div>
          {error ? <ErrorBanner message={error} /> : <HUDLabel />}
        </header>

        <div className="flex flex-col items-end gap-4 md:flex-row md:items-end md:justify-between">
          <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <Navigator loading={loading} />
          </div>
          <div className="pointer-events-auto relative z-40 w-full max-w-md">
            <InfoPanel />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showOnboarding ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="pointer-events-auto fixed inset-x-0 bottom-6 z-40 px-6"
          >
            <div className="mx-auto max-w-md rounded-2xl border border-aurora/40 bg-slate-900/90 px-4 py-4 text-slate-100 shadow-2xl backdrop-blur">
              <h3 className="text-sm font-semibold text-aurora">Welcome to the Spatial Portfolio</h3>
              <ul className="mt-2 space-y-2 text-xs text-slate-200 sm:text-sm">
                <li><strong>Browse Projects</strong> to inspect production-grade builds spanning AI, data viz, and industrial UX.</li>
                <li>Open the <strong>Info Panel</strong> for architecture takeaways, governance notes, and live deployment links.</li>
                <li>Use the <strong>Mini Map</strong> or <strong>Auto Tour</strong> to see how spatial IA plans guide navigation.</li>
                <li>Toggle <strong>Eco Mode</strong> to experience the adaptive rendering pipeline over constrained devices.</li>
                <li>Need a reset? Re-center the camera, then continue exploring curated systems and storytelling beats.</li>
              </ul>
              {onboardingSpotlight.length ? (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {onboardingSpotlight.map((appItem) => (
                    <figure
                      key={appItem.id}
                      className="min-w-[120px] shrink-0 overflow-hidden rounded-lg border border-aurora/30 bg-slate-900/80 shadow-md"
                    >
                      <img
                        src={appItem.icon}
                        alt={`${appItem.title} hero artwork`}
                        className="h-20 w-full object-cover"
                        loading="lazy"
                      />
                      <figcaption className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-aurora/80">
                        {appItem.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
              <button
                type="button"
                className="mt-3 w-full rounded-lg border border-aurora/50 bg-aurora/20 px-3 py-2 text-sm font-medium text-aurora"
                onClick={dismissOnboarding}
              >
                Enter CodeVerse
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!showOnboarding && allowHint ? (
        <button
          type="button"
          className="pointer-events-auto fixed bottom-8 left-8 z-30 rounded-full border border-slate-600/50 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-slate-400 shadow-lg backdrop-blur transition hover:border-aurora/50 hover:text-aurora"
          onClick={() => setShowOnboarding(true)}
        >
          Revisit Tour
        </button>
      ) : null}
    </div>
  );
};

export default App;
