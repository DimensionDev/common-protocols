export const MAGIC_HEADER = new TextEncoder().encode("MASKBOOK-ATTACHMENT");

export interface StorageInput {
  mime: string;
  metadata: Record<string, string> | null;
  block: Uint8Array;
}

export interface StoragePayload {
  version: number;

  mime: string;
  metadata: Record<string, any> | null;
  algorithm: AesGcmParams | undefined;
  salt: Uint8Array | undefined;
  keyHash: Uint8Array | undefined;

  block: Uint8Array;
  blockHash: Uint8Array;
}
