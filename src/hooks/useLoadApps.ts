import { useEffect, useState } from 'react';
import { useWorldStore } from '@store/worldStore';
import type { AppItem } from '@types/app';

interface Options {
  onError?: (error: Error) => void;
}

const DATA_URL = '/data/apps.json';
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE?.toLowerCase();

export const useLoadApps = ({ onError }: Options = {}) => {
  const setApps = useWorldStore((state) => state.setApps);
  const loaded = useWorldStore((state) => state.appsLoaded);
  const [loading, setLoading] = useState(!loaded);

  useEffect(() => {
    if (loaded) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        let data: AppItem[];
        if (DATA_SOURCE === 'firebase') {
          const { loadAppsFromFirebase } = await import('@data/firebaseLoader');
          data = await loadAppsFromFirebase();
        } else {
          const response = await fetch(DATA_URL);
          if (!response.ok) {
            throw new Error(`Unable to load apps.json (${response.status})`);
          }
          data = (await response.json()) as AppItem[];
        }
        if (!cancelled) {
          setApps(data);
          setLoading(false);
        }
      } catch (rawError) {
        if (DATA_SOURCE === 'firebase' && !cancelled) {
          try {
            const response = await fetch(DATA_URL);
            if (!response.ok) {
              throw new Error(`Unable to load fallback apps.json (${response.status})`);
            }
            const fallbackData = (await response.json()) as AppItem[];
            setApps(fallbackData);
            setLoading(false);
            onError?.(rawError instanceof Error ? rawError : new Error('Firebase data load failure'));
            console.warn('Firebase load failed, using local apps.json');
            return;
          } catch (fallbackError) {
            if (!cancelled) {
              const err = fallbackError instanceof Error ? fallbackError : new Error('Unknown data load failure');
              setLoading(false);
              onError?.(err);
              console.error(err);
            }
            return;
          }
        }

        if (!cancelled) {
          const err = rawError instanceof Error ? rawError : new Error('Unknown data load failure');
          setLoading(false);
          onError?.(err);
          console.error(err);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [loaded, onError, setApps]);

  return { loading };
};
