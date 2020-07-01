import { decode as decodePack } from "@msgpack/msgpack";
import { StorageInput, StoragePayload, MAGIC_HEADER } from "./types";
import { bufferEqual } from "../utils";
import { importKey, checksum } from "./utils";
import { verify } from "./verify";

export async function decode(
  jwk: JsonWebKey | false,
  encoded: Uint8Array,
): Promise<StorageInput> {
  verify(encoded);
  const buffer = encoded.slice(MAGIC_HEADER.length);
  const payload = decodePack(buffer) as StoragePayload;
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
