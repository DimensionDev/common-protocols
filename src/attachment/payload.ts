import { decode as decodePack } from "@msgpack/msgpack";
import { MAGIC_HEADER, StoragePayload } from "./types";
import { bufferEqual } from "../utils";
import { checksum } from "./utils";

export async function getPayload(
  passphrase: Uint8Array | undefined,
  encoded: Uint8Array,
) {
  if (!bufferEqual(MAGIC_HEADER, encoded.slice(0, MAGIC_HEADER.length))) {
    throw new Error("unexpected magic header.");
  }
  const buffer = encoded.slice(MAGIC_HEADER.length);
  const payload = decodePack(buffer) as StoragePayload;
  if (payload.version !== 0) {
    throw new Error("unexpected file version.");
  } else if (payload.mime.length === 0) {
    throw new Error("unexpected `.mime`.");
  } else if (!bufferEqual(payload.blockHash, await checksum(payload.block))) {
    throw new Error("unexpected `blockHash`.");
  } else if (passphrase && payload.keyHash) {
    if (!bufferEqual(payload.keyHash, await checksum(passphrase))) {
      throw new Error("unexpected `keyHash`.");
    }
  }
  return payload;
}
