import "mocha";
import { assert } from "chai";
import { promises as fs } from "fs";

import { encode, decode, StorageInput } from "../src/attachment";
import { fixture } from "./utils";

describe("attachement exchange format", () => {
  const encrypted = fixture("encoded-with-encryption.blob");
  const unencrypted = fixture("encoded-without-encryption.blob");
  const passphrase = new TextEncoder().encode("sample");
  const input: StorageInput = {
    mime: "text/plain",
    block: new TextEncoder().encode("sample"),
    metadata: null,
  };

  it("with encryption", async () => {
    const expected = await fs.readFile(encrypted);
    const actual = await decode(passphrase, expected);
    assert.deepStrictEqual(actual, input);
  });

  it("with encryption (self cycle)", async () => {
    const encoded = await encode(passphrase, input);
    const decoded = await decode(passphrase, encoded);
    assert.deepStrictEqual(decoded, input);
  });

  it("without encryption", async () => {
    const expected = await fs.readFile(unencrypted);
    const encoded = await encode(undefined, input);
    assert.isTrue(expected.equals(encoded));
    assert.deepStrictEqual(await decode(undefined, expected), input);
  });
});
