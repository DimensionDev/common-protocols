import "mocha";
import { assert } from "chai";
import { promises as fs } from "fs";

import * as Attachment from "../src/attachment";
import { fixture } from "./utils";
import { StorageInput } from "../src/attachment/types";
import { loadKey } from "../src/attachment/utils";

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
    await Attachment.encode(jwk, input);
    assert.deepStrictEqual(await Attachment.decode(jwk, expected), input);
  });

  it("without encryption", async () => {
    const jwk = false;
    const expected = await fs.readFile(unencrypted);
    assert.isTrue(expected.equals(await Attachment.encode(jwk, input)));
    assert.deepStrictEqual(await Attachment.decode(jwk, expected), input);
  });
});
