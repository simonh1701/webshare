import { describe, it, test, expect, beforeAll } from "@jest/globals";

import { decrypt, encrypt } from "./encryption";
import { toBase58 } from "../util/base58";

describe("encryption with passphrase", () => {
  it("encrypts and decrypts correctly", async () => {
    for (let i = 0; i < 20; i++) {
      const textbuf = new Uint8Array(Math.ceil(Math.random() * 10 * i));
      crypto.getRandomValues(textbuf);
      const text = toBase58(textbuf);

      const passphrasebuf = new Uint8Array(Math.ceil(Math.random() * 10 * i));
      crypto.getRandomValues(passphrasebuf);
      const passphrase = toBase58(passphrasebuf);

      const { salt, iv, encrypted } = await encrypt(passphrase, text);

      const decrypted = await decrypt(
        passphrase,
        toBase58(salt),
        toBase58(iv),
        toBase58(encrypted)
      );

      expect(decrypted).toEqual(text);
    }
  }, 30_000);
});
