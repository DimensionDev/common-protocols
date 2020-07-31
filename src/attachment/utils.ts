export async function checksum(block: Uint8Array) {
  const hashed = await crypto.subtle.digest({ name: "SHA-256" }, block);
  return new Uint8Array(hashed);
}

export async function loadKey(
  passphrase: Uint8Array,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const key = await crypto.subtle.importKey(
    "raw",
    passphrase,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 1000,
      hash: "SHA-256",
    },
    key,
    { name: "AES-GCM", length: 128 },
    true,
    ["encrypt", "decrypt"],
  );
}
