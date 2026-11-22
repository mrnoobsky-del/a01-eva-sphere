export type DataStatus = 'LIVE' | 'SIM' | 'CALC' | 'DESIGN' | 'ILLUSTRATIVE' | 'STALE' | 'UNKNOWN';
export type DataQuality = 'GOOD' | 'DEGRADED' | 'BAD' | 'UNASSESSED';

export interface RealityValue<T> {
  value: T;
  unit: string;
  status: DataStatus;
  sourceId: string;
  observedAt: string;
  receivedAt: string;
  schemaVersion: string;
  quality: DataQuality;
}

export interface ValidationResult { valid: boolean; reasons: string[]; }

export function validateRealityValue<T>(input: RealityValue<T>): ValidationResult {
  const reasons: string[] = [];
  if (!input.sourceId.trim()) reasons.push('sourceId is required');
  if (!input.unit.trim()) reasons.push('unit is required');
  if (!input.schemaVersion.trim()) reasons.push('schemaVersion is required');
  if (!Number.isFinite(Date.parse(input.observedAt))) reasons.push('observedAt must be a valid timestamp');
  if (!Number.isFinite(Date.parse(input.receivedAt))) reasons.push('receivedAt must be a valid timestamp');
  if (input.status === 'LIVE' && input.quality === 'BAD') reasons.push('bad-quality values cannot be marked LIVE');
  return { valid: reasons.length === 0, reasons };
}

export function isStale(input: RealityValue<unknown>, maxAgeMs: number, now = Date.now()): boolean {
  const observed = Date.parse(input.observedAt);
  if (!Number.isFinite(observed)) return true;
  return now - observed > maxAgeMs;
}