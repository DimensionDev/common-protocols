import { encode as encodePack } from "@msgpack/msgpack";

import { checksum, loadKey } from "./utils";
import { MAGIC_HEADER, StoragePayload, StorageInput } from "./types";

export async function encode(
  passphrase: Uint8Array | undefined,
  input: StorageInput,
): Promise<Uint8Array> {
  let algorithm, salt, block, keyHash;
  if (passphrase === undefined) {
    block = input.block;
  } else {
    keyHash = await checksum(passphrase);
    salt = crypto.getRandomValues(new Uint8Array(12));
    const key = await loadKey(passphrase, salt);
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
    salt,
    keyHash,

    block,
    blockHash: await checksum(block),
  };
  return Uint8Array.from([...MAGIC_HEADER, ...encodePack(payload)]);
}
