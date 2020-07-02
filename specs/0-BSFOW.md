# Blockchain Storage File Over Web

## Binary layout

### Magic header

```plain
MASKBOOK-ATTACHMENT
```

### Data payload

> 1. The payload use <https://msgpack.org> encoding
>
> 2. Use this field order

| Order | Field Name        | Description            |
| ----- | ----------------- | ---------------------- |
| 0     | version           | `0` fixed value        |
| 1     | mime              | `.block` mime type     |
| 2     | metadata          | metadata dictionary    |
| 2     | metadata.fileName | required               |
| 3     | algorithm         | `AES-GCM` params       |
| 4     | block             | Uint8Array block       |
| 5     | blockHash         | SHA2 (256) on `.block` |

## Sample

```plain
$ hexdump -C test/fixtures/encoded-without-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 86 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 81 a8  66 69 6c 65 4e 61 6d 65  |tadata..fileName|
00000040  aa 73 61 6d 70 6c 65 2e  74 78 74 a9 61 6c 67 6f  |.sample.txt.algo|
00000050  72 69 74 68 6d c0 a5 62  6c 6f 63 6b c4 06 73 61  |rithm..block..sa|
00000060  6d 70 6c 65 a9 62 6c 6f  63 6b 48 61 73 68 c4 20  |mple.blockHash. |
00000070  af 2b db e1 aa 9b 6e c1  e2 ad e1 d6 94 f4 1f c7  |.+....n.........|
00000080  1a 83 1d 02 68 e9 89 15  62 11 3d 8a 62 ad d1 bf  |....h...b.=.b...|
00000090
```

```plain
$ hexdump -C test/fixtures/encoded-with-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 86 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 81 a8  66 69 6c 65 4e 61 6d 65  |tadata..fileName|
00000040  aa 73 61 6d 70 6c 65 2e  74 78 74 a9 61 6c 67 6f  |.sample.txt.algo|
00000050  72 69 74 68 6d 83 a4 6e  61 6d 65 a7 41 45 53 2d  |rithm..name.AES-|
00000060  47 43 4d a2 69 76 c4 0c  61 6b ab 89 b8 2a c6 b5  |GCM.iv..ak...*..|
00000070  d3 08 f7 65 a9 74 61 67  4c 65 6e 67 74 68 cc 80  |...e.tagLength..|
00000080  a5 62 6c 6f 63 6b c4 16  49 fe 23 75 e3 90 ad 22  |.block..I.#u..."|
00000090  81 d2 dd 90 45 f3 8e 33  2d 91 9a d6 87 20 a9 62  |....E..3-.... .b|
000000a0  6c 6f 63 6b 48 61 73 68  c4 20 78 66 e6 7b 85 f4  |lockHash. xf.{..|
000000b0  57 78 c0 7d c3 c5 e1 55  a1 a8 a6 86 5b 7d 5f ec  |Wx.}...U....[}_.|
000000c0  70 f3 aa 86 65 52 3e 18  d6 79                    |p...eR>..y|
000000ca
```
