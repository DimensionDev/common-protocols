import { getPayload } from "./payload";
import { StorageInput } from "./types";
import { importKey } from "./utils";

export async function decode(
  jwk: JsonWebKey | false,
  encoded: Uint8Array,
): Promise<StorageInput> {
  const payload = await getPayload(encoded);
  let block = payload.block;
  if (jwk !== false && payload.algorithm !== undefined) {
    const key = await importKey(jwk);
    const decrypted = await crypto.subtle.decrypt(
      payload.algorithm,
      key,
      payload.block,
    );
    block = new Uint8Array(decrypted);
  }
  return {
    mime: payload.mime,
    metadata: payload.metadata,
    block,
  };
}
