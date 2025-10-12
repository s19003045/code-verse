export type Vec3 = [number, number, number];

export interface AppItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  position: Vec3;
  icon: string;
  link: string;
  video?: string;
  region?: string;
  features?: string[];
  applicationType?: string;
  techSummary?: string;
}

export type CameraMode = 'desktop' | 'tablet' | 'mobile';

export interface CameraPreset {
  position: Vec3;
  lookAt: Vec3;
}
