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

| Order | Field     | Description            |
| ----- | --------- | ---------------------- |
| 0     | version   | `0` fixed value        |
| 1     | mime      | `.block` mime type     |
| 2     | metadata  | metadata mapping       |
| 3     | algorithm | `AES-GCM` params       |
| 4     | block     | Uint8Array block       |
| 5     | blockHash | SHA3 (224) on `.block` |

## Sample

```plain
$ hexdump -C test/fixtures/encoded-without-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 86 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 81 a8  66 69 6c 65 4e 61 6d 65  |tadata..fileName|
00000040  aa 73 61 6d 70 6c 65 2e  74 78 74 a9 61 6c 67 6f  |.sample.txt.algo|
00000050  72 69 74 68 6d c0 a5 62  6c 6f 63 6b c4 06 73 61  |rithm..block..sa|
00000060  6d 70 6c 65 a9 62 6c 6f  63 6b 48 61 73 68 c4 1c  |mple.blockHash..|
00000070  9f b6 fc 20 32 9e 0f af  12 49 97 8a c4 96 95 7d  |... 2....I.....}|
00000080  74 3c 33 28 31 3f 52 5e  f2 9f 8c c4              |t<3(1?R^....|
0000008c
```

```plain
$ hexdump -C test/fixtures/encoded-with-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 86 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 81 a8  66 69 6c 65 4e 61 6d 65  |tadata..fileName|
00000040  aa 73 61 6d 70 6c 65 2e  74 78 74 a9 61 6c 67 6f  |.sample.txt.algo|
00000050  72 69 74 68 6d 83 a4 6e  61 6d 65 a7 41 45 53 2d  |rithm..name.AES-|
00000060  47 43 4d a2 69 76 c4 0c  cb 40 b6 82 14 62 8a 99  |GCM.iv...@...b..|
00000070  ba 71 e6 07 a9 74 61 67  4c 65 6e 67 74 68 cc 80  |.q...tagLength..|
00000080  a5 62 6c 6f 63 6b c4 16  ea 62 53 34 76 13 22 90  |.block...bS4v.".|
00000090  71 0f c5 e7 47 56 a1 b6  3e ad 9e 7a e6 a2 a9 62  |q...GV..>..z...b|
000000a0  6c 6f 63 6b 48 61 73 68  c4 1c bb a6 ff a7 ab 04  |lockHash........|
000000b0  9a bd b4 b9 cd 6c 6b 74  25 d6 90 1e f4 de 84 67  |.....lkt%......g|
000000c0  55 d4 9f 8d ba bc                                 |U.....|
000000c6
```
