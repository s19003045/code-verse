import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWorldStore } from '@store/worldStore';
import useIsMobile from '@hooks/useIsMobile';

export const InfoPanel = () => {
  const apps = useWorldStore((state) => state.apps);
  const selectedAppId = useWorldStore((state) => state.selectedAppId);
  const selectApp = useWorldStore((state) => state.selectApp);

  const app = apps.find((item) => item.id === selectedAppId);

  const isMobile = useIsMobile();
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [techExpanded, setTechExpanded] = useState(false);

  const isCreator = app?.id === 'creator-garywu' || app?.region === 'About';

  const featuresShouldCollapse = isCreator || (app?.features?.length ?? 0) > 3;
  const techShouldCollapse = isCreator || (app?.techSummary?.length ?? 0) > 240;

  const regionLabelClass = isCreator
    ? 'text-[11px] uppercase tracking-[0.3em] text-emerald-300/80'
    : 'text-[11px] uppercase tracking-[0.3em] text-aurora/70';
  const titleClass = isCreator ? 'mt-1 text-2xl font-semibold text-emerald-50' : 'mt-1 text-2xl font-semibold text-white';
  const subtitleClass = isCreator
    ? 'mt-1 text-sm font-medium text-emerald-200/90'
    : 'mt-1 text-sm font-medium text-slate-300';
  const descriptionClass = isCreator
    ? 'mt-4 text-sm leading-relaxed text-emerald-100/95'
    : 'mt-4 text-sm leading-relaxed text-slate-200';
  const chipClass = isCreator
    ? 'rounded-full border border-emerald-400/50 bg-emerald-900/30 px-3 py-1 text-xs text-emerald-200'
    : 'rounded-full border border-aurora/40 bg-aurora/10 px-3 py-1 text-xs text-aurora';
  const sectionHeadingClass = isCreator
    ? 'text-xs uppercase tracking-[0.3em] text-emerald-300/70'
    : 'text-xs uppercase tracking-[0.3em] text-slate-400';
  const collapsibleButtonClass = isCreator
    ? 'flex w-full items-center justify-between rounded-lg border border-emerald-500/50 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-100'
    : 'flex w-full items-center justify-between rounded-lg border border-slate-600/70 bg-slate-900/60 px-3 py-2 text-sm text-slate-200';
  const primaryCtaBaseClass = isCreator
    ? 'rounded-lg bg-emerald-400 font-semibold text-emerald-950 transition hover:bg-emerald-300'
    : 'rounded-lg bg-aurora font-semibold text-slate-900 transition hover:bg-aurora/90';
  const secondaryCtaBaseClass = isCreator
    ? 'rounded-lg border border-emerald-500/50 text-emerald-200 hover:border-emerald-400/80 hover:text-emerald-100'
    : 'rounded-lg border border-slate-600 text-slate-200 hover:border-aurora hover:text-aurora';
  const primaryCtaLabel = isCreator ? 'Explore GitHub ↗' : 'Visit Deployment ↗';
  const panelDesktopClass = isCreator
    ? 'pointer-events-auto relative z-30 w-full max-w-md overflow-y-auto rounded-2xl border border-emerald-500/50 bg-gradient-to-br from-emerald-950/95 via-slate-950/90 to-slate-950/96 px-6 py-6 text-emerald-100 shadow-[0_22px_60px_rgba(16,185,129,0.28)] backdrop-blur max-h-[90vh]'
    : 'pointer-events-auto relative z-30 w-full max-w-md overflow-y-auto rounded-2xl border border-slate-700/60 bg-slate-900/90 backdrop-blur px-6 py-5 shadow-2xl max-h-[90vh]';
  const panelFooterGradient = isCreator
    ? 'pointer-events-auto fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-emerald-950/95 via-emerald-950/70 to-transparent px-5 pb-6 pt-4'
    : 'pointer-events-auto fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent px-5 pb-6 pt-4';
  const regionLabel = isCreator ? 'About the Creator' : app?.region ?? 'CodeVerse';

  const summaryItems = useMemo(() => {
    if (!app) return [];
    const items = [] as Array<{ label: string; value: string }>;
    if (app.applicationType) {
      items.push({ label: isCreator ? 'Focus' : 'Application Type', value: app.applicationType });
    }
    if (app.region) {
      items.push({ label: 'Region', value: app.region });
    }
    if (app.tags && app.tags.length) {
      items.push({ label: isCreator ? 'Disciplines' : 'Key Tags', value: app.tags.slice(0, 4).join(' · ') });
    }
    return items;
  }, [app, isCreator]);

  const summaryCardClass = isCreator
    ? 'mt-4 grid grid-cols-1 gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 sm:grid-cols-2'
    : 'mt-4 grid grid-cols-1 gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 sm:grid-cols-2';
  const summaryLabelClass = isCreator
    ? 'text-[10px] uppercase tracking-[0.4em] text-emerald-300/70'
    : 'text-[10px] uppercase tracking-[0.4em] text-slate-400/80';
  const summaryValueClass = isCreator
    ? 'text-sm font-medium text-emerald-100'
    : 'text-sm font-medium text-slate-100';

  const heroFigure = app?.icon
    ? isCreator
      ? (
          <figure className="overflow-hidden rounded-2xl border border-emerald-400/60 bg-emerald-900/40 shadow-[0_18px_40px_rgba(6,95,70,0.35)]">
            <img
              src={app.icon}
              alt={`${app.title} showcase artwork`}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
          </figure>
        )
      : (
          <figure className="overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/80 shadow-xl">
            <img
              src={app.icon}
              alt={`${app.title} showcase artwork`}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
          </figure>
        )
    : null;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        selectApp(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectApp]);

  useEffect(() => {
    setFeaturesExpanded(false);
    setTechExpanded(false);
  }, [app?.id]);

  const renderFeatures = (collapsible: boolean) => {
    if (!app?.features || app.features.length === 0) return null;
    const content = (
      <motion.ul
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className={`mt-2 space-y-2 text-sm ${isCreator ? 'text-emerald-100' : 'text-slate-200'}`}
      >
        {app.features.map((feature) => (
          <li key={feature} className={isCreator ? 'flex items-start gap-3' : 'flex gap-2'}>
            {isCreator ? (
              <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
            ) : (
              <span className="text-aurora">•</span>
            )}
            <span>{feature}</span>
          </li>
        ))}
      </motion.ul>
    );

    if (!collapsible) {
      return (
        <section className={`mt-5 ${isCreator ? 'rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3' : ''}`}>
          <h3 className={sectionHeadingClass}>Features</h3>
          {content}
        </section>
      );
    }

    return (
      <section className="mt-5">
        <button
          type="button"
          className={collapsibleButtonClass}
          onClick={() => setFeaturesExpanded((value) => !value)}
        >
          <span className={sectionHeadingClass}>Features</span>
          <span>{featuresExpanded ? '−' : '+'}</span>
        </button>
        <AnimatePresence>{featuresExpanded ? content : null}</AnimatePresence>
      </section>
    );
  };

  const renderTechSummary = (collapsible: boolean) => {
    if (!app?.techSummary) return null;
    const content = (
      <motion.p
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className={`mt-2 text-sm leading-relaxed ${isCreator ? 'text-emerald-100/90' : 'text-slate-300'}`}
      >
        {app.techSummary}
      </motion.p>
    );

    if (!collapsible) {
      return (
        <section className={`mt-5 ${isCreator ? 'rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3' : ''}`}>
          <h3 className={sectionHeadingClass}>Tech & Architecture</h3>
          {content}
        </section>
      );
    }

    return (
      <section className="mt-5">
        <button
          type="button"
          className={collapsibleButtonClass}
          onClick={() => setTechExpanded((value) => !value)}
        >
          <span className={sectionHeadingClass}>Tech & Architecture</span>
          <span>{techExpanded ? '−' : '+'}</span>
        </button>
        <AnimatePresence>{techExpanded ? content : null}</AnimatePresence>
      </section>
    );
  };

  return (
    <AnimatePresence>
      {app ? (
        isMobile ? (
          <motion.div
            key={app.id}
            className={`pointer-events-auto fixed inset-0 z-40 flex flex-col ${isCreator ? 'bg-emerald-950/95' : 'bg-slate-950/95'} backdrop-blur`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-6">
              {heroFigure}

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className={regionLabelClass}>{regionLabel}</p>
                  <h2 className={titleClass}>{app.title}</h2>
                  {app.applicationType ? (
                    <p className={subtitleClass}>{app.applicationType}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="Close info panel"
                  className={`rounded-md border px-2 py-1 text-xs ${
                    isCreator
                      ? 'border-emerald-500/60 text-emerald-100 hover:border-emerald-300/80 hover:text-emerald-50'
                      : 'border-slate-700/80 text-slate-300'
                  }`}
                  onClick={() => selectApp(null)}
                >
                  Close
                </button>
              </div>

              {summaryItems.length ? (
                <dl className={summaryCardClass}>
                  {summaryItems.map((item) => (
                    <div key={item.label}>
                      <dt className={summaryLabelClass}>{item.label}</dt>
                      <dd className={summaryValueClass}>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <p className={descriptionClass}>{app.description}</p>

              <section className="mt-5">
                <h3 className={sectionHeadingClass}>{isCreator ? 'Focus Streams' : 'Tech Stack'}</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <li key={tag} className={chipClass}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </section>

              {renderFeatures(true)}
              {renderTechSummary(true)}
            </div>

            <div className={panelFooterGradient}>
              <a
                className={`${primaryCtaBaseClass} block px-4 py-3 text-center text-sm`}
                href={app.link}
                target="_blank"
                rel="noreferrer"
              >
                {primaryCtaLabel}
              </a>
              {app.video ? (
                <a
                  className={`${secondaryCtaBaseClass} mt-3 block px-4 py-3 text-center text-sm`}
                  href={app.video}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch Demo
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : (
          <motion.aside
            key={app.id}
            className={panelDesktopClass}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {heroFigure}

            <header className={`${isCreator ? 'mt-6' : 'mt-5'} flex items-start justify-between gap-4`}>
              <div>
                <p className={regionLabelClass}>{regionLabel}</p>
                <h2 className={titleClass}>{app.title}</h2>
                {app.applicationType ? (
                  <p className={subtitleClass}>{app.applicationType}</p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Close info panel"
                className={`rounded-md border px-2 py-1 text-xs ${
                  isCreator
                    ? 'border-emerald-500/60 text-emerald-100 hover:border-emerald-300/80 hover:text-emerald-50'
                    : 'border-slate-700/80 text-slate-300 hover:border-aurora/80 hover:text-aurora'
                }`}
                onClick={() => selectApp(null)}
              >
                ESC
              </button>
            </header>

            {summaryItems.length ? (
              <dl className={summaryCardClass}>
                {summaryItems.map((item) => (
                  <div key={item.label}>
                    <dt className={summaryLabelClass}>{item.label}</dt>
                    <dd className={summaryValueClass}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <p className={descriptionClass}>{app.description}</p>

            <section className="mt-4">
              <h3 className={sectionHeadingClass}>{isCreator ? 'Focus Streams' : 'Tech Stack'}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {app.tags.map((tag) => (
                  <li key={tag} className={chipClass}>
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            {renderFeatures(featuresShouldCollapse)}
            {renderTechSummary(techShouldCollapse)}

            <footer className="mt-6 flex flex-wrap gap-3">
              <a
                className={`${primaryCtaBaseClass} px-4 py-2 text-sm`}
                href={app.link}
                target="_blank"
                rel="noreferrer"
              >
                {primaryCtaLabel}
              </a>
              {app.video ? (
                <a
                  className={`${secondaryCtaBaseClass} px-4 py-2 text-sm`}
                  href={app.video}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch Demo
                </a>
              ) : null}
            </footer>
          </motion.aside>
        )
      ) : null}
    </AnimatePresence>
  );
};

export default InfoPanel;
