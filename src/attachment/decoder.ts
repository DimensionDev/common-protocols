import { getPayload } from "./payload";
import { StorageInput } from "./types";
import { loadKey } from "./utils";

export async function decode(
  passphrase: Uint8Array | undefined,
  encoded: Uint8Array,
): Promise<StorageInput> {
  const payload = await getPayload(passphrase, encoded);
  let block = payload.block;
  if (passphrase && payload.algorithm) {
    block = new Uint8Array(
      await crypto.subtle.decrypt(
        payload.algorithm,
        await loadKey(passphrase),
        payload.block,
      ),
    );
  }
  return {
    mime: payload.mime,
    metadata: payload.metadata,
    block,
  };
}
