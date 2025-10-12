import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useWorldStore } from '@store/worldStore';

const AMBIENT_SRC = '/audio/ambient.mp3';

export const useAmbientAudio = () => {
  const muted = useWorldStore((state) => state.muted);
  const setMuted = useWorldStore((state) => state.setMuted);
  const ambientRef = useRef<Howl | null>(null);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    const ambient = new Howl({
      src: [AMBIENT_SRC],
      loop: true,
      volume: mutedRef.current ? 0 : 0.4,
      preload: true,
      onloaderror: () => {
        console.warn('Ambient audio failed to load. Check /public/audio assets.');
        setMuted(true);
      }
    });

    ambientRef.current = ambient;

    if (!mutedRef.current) {
      ambient.play();
    }

    return () => {
      ambient.unload();
      ambientRef.current = null;
    };
  }, [setMuted]);

  useEffect(() => {
    const ambient = ambientRef.current;
    if (!ambient) return;

    ambient.volume(muted ? 0 : 0.4);
    if (muted && ambient.playing()) {
      ambient.pause();
    } else if (!muted && !ambient.playing()) {
      ambient.play();
    }
  }, [muted]);
};
