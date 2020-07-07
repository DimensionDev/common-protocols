import { getPayload } from "./payload";
import { StorageInput } from "./types";
import { loadKey } from "./utils";

export async function decode(
  passphrase: Uint8Array | undefined,
  encoded: Uint8Array,
): Promise<StorageInput> {
  const payload = await getPayload(passphrase, encoded);
  let block = payload.block;
  if (passphrase && payload.algorithm && payload.salt) {
    const data = await crypto.subtle.decrypt(
      payload.algorithm,
      await loadKey(passphrase, payload.salt),
      payload.block,
    );
    block = new Uint8Array(data);
  }
  return {
    mime: payload.mime,
    metadata: payload.metadata,
    block,
  };
}
