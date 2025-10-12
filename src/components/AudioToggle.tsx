import { useWorldStore } from '@store/worldStore';

export const AudioToggle = () => {
  const muted = useWorldStore((state) => state.muted);
  const toggleMuted = useWorldStore((state) => state.toggleMuted);

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={!muted}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
        muted
          ? 'border-slate-700/70 bg-slate-950/60 text-slate-400 hover:border-aurora/60 hover:text-aurora'
          : 'border-aurora bg-aurora/20 text-aurora shadow-[0_0_12px_rgba(0,194,255,0.25)]'
      }`}
    >
      <span aria-hidden>{muted ? '🔇' : '🔊'}</span>
      <span>{muted ? 'Sound Off' : 'Sound On'}</span>
    </button>
  );
};

export default AudioToggle;
