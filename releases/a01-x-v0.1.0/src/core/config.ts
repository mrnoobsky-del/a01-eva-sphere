export const WORLD = {
  domeRadius: 27,
  domeBaseY: 0,
  domeApexY: 31,
  outerRadius: 24,
  groundRadius: 25.5,
  atriumRadius: 9.2,
  floorHeights: [0.35, 4.2, 8.1, 12, 15.9],
  floorNames: ['Площадь', 'Галерея', 'Галерея', 'Галерея', 'Верхний ярус']
} as const;

export type QualityName = 'auto' | 'low' | 'medium' | 'high' | 'ultra';

export const QUALITY_PROFILES: Record<Exclude<QualityName, 'auto'>, {
  pixelRatio: number;
  shadows: boolean;
  shadowMapSize: number;
  foliageVisible: boolean;
  decorativeLights: boolean;
}> = {
  low: { pixelRatio: 0.9, shadows: false, shadowMapSize: 0, foliageVisible: false, decorativeLights: false },
  medium: { pixelRatio: 1.15, shadows: false, shadowMapSize: 0, foliageVisible: true, decorativeLights: false },
  high: { pixelRatio: 1.5, shadows: true, shadowMapSize: 1024, foliageVisible: true, decorativeLights: true },
  ultra: { pixelRatio: 1.85, shadows: true, shadowMapSize: 1536, foliageVisible: true, decorativeLights: true }
};

export function getFloorName(level: number): string {
  return WORLD.floorNames[Math.min(Math.max(level, 0), WORLD.floorNames.length - 1)];
}