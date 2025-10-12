import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useWorldStore } from '@store/worldStore';

const EFFECTS = {
  hover: '/audio/ui-hover.mp3',
  select: '/audio/ui-select.mp3',
  teleport: '/audio/ui-teleport.mp3'
} as const;

type EffectKey = keyof typeof EFFECTS;

const isEffectKey = (value: string): value is EffectKey => value in EFFECTS;

const createEffectBank = () => {
  const entries = Object.entries(EFFECTS) as Array<[EffectKey, string]>;
  const sounds = new Map<EffectKey, Howl>();
  entries.forEach(([key, src]) => {
    sounds.set(
      key,
      new Howl({
        src: [src],
        volume: 0.5,
        preload: true
      })
    );
  });
  return sounds;
};

export const useSoundEffects = () => {
  const muted = useWorldStore((state) => state.muted);
  const event = useWorldStore((state) => state.sfxEvent);

  const bankRef = useRef<Map<EffectKey, Howl> | null>(null);

  useEffect(() => {
    bankRef.current = createEffectBank();
    return () => {
      bankRef.current?.forEach((sound) => sound.unload());
      bankRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!event || muted || !isEffectKey(event.id)) return;
    const sound = bankRef.current?.get(event.id);
    sound?.play();
  }, [event, muted]);
};

export default useSoundEffects;
