import type { RealityValue } from '../reality/data';

export interface SystemIdentity {
  systemId: string;
  systemType: 'ENERGY' | 'HVAC' | 'WATER' | 'WASTE' | 'LIFTS' | 'SAFETY' | 'ROBOTICS';
  schemaVersion: string;
}
export interface TelemetryPoint<T = number> { pointId: string; name: string; reading: RealityValue<T>; }
export interface TelemetryBatch { identity: SystemIdentity; generatedAt: string; points: TelemetryPoint[]; }
export interface SystemAdapter {
  readonly identity: SystemIdentity;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  readTelemetry(): Promise<TelemetryBatch>;
}
export interface CommandRequest<T = unknown> {
  commandId: string;
  targetId: string;
  requestedBy: string;
  requestedAt: string;
  payload: T;
  approvalId: string;
}
export type CommandResult =
  | { accepted: true; commandId: string; status: 'QUEUED' | 'EXECUTED' }
  | { accepted: false; commandId: string; status: 'REJECTED'; reason: string };
export interface CommandGateway { submit<T>(request: CommandRequest<T>): Promise<CommandResult>; }
export const SYSTEMS_INTEGRATION_NOTICE =
  'Adapter contracts only. No physical equipment or operational control is connected in this prototype.';