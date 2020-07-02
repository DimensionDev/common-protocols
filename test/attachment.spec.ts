import "mocha";
import { assert } from "chai";
import { promises as fs } from "fs";

import { encode, decode, StorageInput, loadKey } from "../src/attachment";
import { fixture } from "./utils";

describe("attachement exchange format", () => {
  const encrypted = fixture("encoded-with-encryption.blob");
  const unencrypted = fixture("encoded-without-encryption.blob");
  const input: StorageInput = {
    mime: "text/plain",
    block: new TextEncoder().encode("sample"),
    metadata: {
      fileName: "sample.txt",
    },
  };

  it("with encryption", async () => {
    const jwk = await loadKey(new TextEncoder().encode("sample"));
    const expected = await fs.readFile(encrypted);
    assert.deepStrictEqual(await decode(jwk, expected), input);
  });

  it("without encryption", async () => {
    const jwk = false;
    const expected = await fs.readFile(unencrypted);
    const encoded = await encode(jwk, input);
    assert.isTrue(expected.equals(encoded));
    assert.deepStrictEqual(await decode(jwk, expected), input);
  });
});
