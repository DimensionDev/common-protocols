import { decode as decodePack } from "@msgpack/msgpack";
import { MAGIC_HEADER, StoragePayload } from "./types";
import { bufferEqual } from "../utils";
import { checksum } from "./utils";

export function verify(encoded: Uint8Array) {
  if (!bufferEqual(MAGIC_HEADER, encoded.slice(0, MAGIC_HEADER.length))) {
    throw new Error("not expected magic header.");
  }
  const buffer = encoded.slice(MAGIC_HEADER.length);
  const payload = decodePack(buffer) as StoragePayload;
  if (payload.version !== 0) {
    throw new Error("not expected file version.");
  } else if (payload.mime.length !== 0) {
    throw new Error("not expected mime.");
  } else if (!bufferEqual(payload.blockHash, checksum(payload.block))) {
    throw new Error("block checksum failed.");
  }
}
