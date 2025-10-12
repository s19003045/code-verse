import { useMemo } from 'react';
import { useWorldStore } from '@store/worldStore';
import { AppCard } from './AppCard';
import CreatorFlag from './CreatorFlag';

export const ApplicationLayer = () => {
  const apps = useWorldStore((state) => state.apps);

  const cards = useMemo(
    () =>
      apps.map((app) =>
        app.id === 'creator-garywu' ? <CreatorFlag key={app.id} app={app} /> : <AppCard key={app.id} app={app} />
      ),
    [apps]
  );

  return <group>{cards}</group>;
};

export default ApplicationLayer;
