import { encode as encodePack } from "@msgpack/msgpack";

import { checksum, importKey } from "./utils";
import { MAGIC_HEADER, StoragePayload, StorageInput } from "./types";

export async function encode(
  jwk: JsonWebKey | false,
  input: StorageInput,
): Promise<Uint8Array> {
  let algorithm, block;
  if (jwk === false) {
    block = input.block;
  } else {
    const key = await importKey(jwk);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    algorithm = { name: "AES-GCM", iv, tagLength: 128 };
    const encrypted = await crypto.subtle.encrypt(algorithm, key, input.block);
    block = new Uint8Array(encrypted);
  }
  const payload: StoragePayload = {
    version: 0,

    mime: input.mime,
    metadata: input.metadata,
    algorithm,

    block,
    blockHash: await checksum(block),
  };
  return Uint8Array.from([...MAGIC_HEADER, ...encodePack(payload)]);
}
