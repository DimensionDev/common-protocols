import { SHA3Hash } from "sha3";

export function importKey(jwk: JsonWebKey) {
  return crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "AES-GCM", length: 128 },
    false,
    ["encrypt", "decrypt"],
  );
}

export function checksum(block: Uint8Array) {
  return new SHA3Hash(224).update(Buffer.from(block)).digest();
}

export async function loadKey(
  password: Uint8Array | null,
): Promise<JsonWebKey | false> {
  if (password === null) {
    return false;
  }
  const key = await crypto.subtle.importKey(
    "raw",
    password,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );
  const webKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: Uint8Array.of(108, 133, 124, 142, 43, 136, 76, 202),
      iterations: 1000,
      hash: "SHA-256",
    },
    key,
    { name: "AES-GCM", length: 128 },
    true,
    ["encrypt", "decrypt"],
  );
  return crypto.subtle.exportKey("jwk", webKey);
}
