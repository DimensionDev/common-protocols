import { decode as decodePack } from "@msgpack/msgpack";
import { StorageInput, StoragePayload, MAGIC_HEADER } from "./types";
import { bufferEqual } from "../utils";
import { importKey, checksum } from "./utils";

export async function decode(
  jwk: JsonWebKey | false,
  encoded: Uint8Array,
): Promise<StorageInput> {
  if (!bufferEqual(MAGIC_HEADER, encoded.slice(0, MAGIC_HEADER.length))) {
    throw new Error("not expected magic header.");
  }
  const buffer = encoded.slice(MAGIC_HEADER.length);
  const payload = decodePack(buffer) as StoragePayload;
  if (payload.version !== 0) {
    throw new Error("not supported file version.");
  } else if (!bufferEqual(payload.blockHash, checksum(payload.block))) {
    throw new Error("block checksum failed.");
  }
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
