import { fromBase58 } from "../util/base58";

export async function generateKey() {
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 128,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

async function getKeyFromPassphrase(passphrase: string, salt: Uint8Array) {
  const encoded = new TextEncoder().encode(passphrase);

  const encryptKeyMaterial = await crypto.subtle.importKey(
    "raw",
    encoded,
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  const key: CryptoKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    encryptKeyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  return key;
}

export async function encrypt(
  passphrase: string,
  text: string
): Promise<{
  salt: Uint8Array;
  iv: Uint8Array;
  encrypted: Uint8Array;
}> {
  const salt: Uint8Array = crypto.getRandomValues(new Uint8Array(16));
  const key = await getKeyFromPassphrase(passphrase, salt);

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    new TextEncoder().encode(text)
  );

  return {
    salt,
    iv,
    encrypted: new Uint8Array(encryptedBuffer),
  };
}

export async function decrypt(
  passphrase: string,
  salt: string,
  iv: string,
  encrypted: string
): Promise<string> {
  const key = await getKeyFromPassphrase(passphrase, fromBase58(salt));

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: fromBase58(iv),
    },
    key,
    fromBase58(encrypted)
  );

  return new TextDecoder().decode(decrypted);
}
