export async function checksum(block: Uint8Array) {
  const hashed = await crypto.subtle.digest({ name: "SHA-256" }, block);
  return new Uint8Array(hashed);
}

export async function loadKey(passphrase: Uint8Array): Promise<CryptoKey> {
  const key = await crypto.subtle.importKey(
    "raw",
    passphrase,
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
  return webKey;
}
