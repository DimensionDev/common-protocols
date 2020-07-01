export function bufferEqual(buf1: Uint8Array, buf2: Uint8Array) {
  if (buf1 === buf2) {
    return true;
  } else if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }
  let i = buf1.byteLength;
  while (i--) {
    if (buf1[i] !== buf2[i]) {
      return false;
    }
  }
  return true;
}
