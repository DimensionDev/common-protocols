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

| Order | Field Name | Description            |
| ----- | ---------- | ---------------------- |
| 0     | version    | `0` fixed value        |
| 1     | mime       | `.block` mime type     |
| 2     | metadata   | metadata dictionary    |
| 3     | salt       | for PBKDF2 salt        |
| 3     | keyHash    | for encrypted key hash |
| 4     | algorithm  | `AES-GCM` params       |
| 5     | block      | Uint8Array block       |
| 6     | blockHash  | SHA2 (256) on `.block` |

## Sample

```plain
$ hexdump -C test/fixtures/encoded-without-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 87 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 81 a8  66 69 6c 65 4e 61 6d 65  |tadata..fileName|
00000040  aa 73 61 6d 70 6c 65 2e  74 78 74 a9 61 6c 67 6f  |.sample.txt.algo|
00000050  72 69 74 68 6d c0 a7 6b  65 79 48 61 73 68 c0 a5  |rithm..keyHash..|
00000060  62 6c 6f 63 6b c4 06 73  61 6d 70 6c 65 a9 62 6c  |block..sample.bl|
00000070  6f 63 6b 48 61 73 68 c4  20 af 2b db e1 aa 9b 6e  |ockHash. .+....n|
00000080  c1 e2 ad e1 d6 94 f4 1f  c7 1a 83 1d 02 68 e9 89  |.............h..|
00000090  15 62 11 3d 8a 62 ad d1  bf                       |.b.=.b...|
00000099
```

```plain
$ hexdump -C test/fixtures/encoded-with-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 87 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 81 a8  66 69 6c 65 4e 61 6d 65  |tadata..fileName|
00000040  aa 73 61 6d 70 6c 65 2e  74 78 74 a9 61 6c 67 6f  |.sample.txt.algo|
00000050  72 69 74 68 6d 83 a4 6e  61 6d 65 a7 41 45 53 2d  |rithm..name.AES-|
00000060  47 43 4d a2 69 76 c4 0c  f9 51 10 97 fc 98 f7 8b  |GCM.iv...Q......|
00000070  ca e8 d0 10 a9 74 61 67  4c 65 6e 67 74 68 cc 80  |.....tagLength..|
00000080  a7 6b 65 79 48 61 73 68  c4 20 af 2b db e1 aa 9b  |.keyHash. .+....|
00000090  6e c1 e2 ad e1 d6 94 f4  1f c7 1a 83 1d 02 68 e9  |n.............h.|
000000a0  89 15 62 11 3d 8a 62 ad  d1 bf a5 62 6c 6f 63 6b  |..b.=.b....block|
000000b0  c4 16 67 12 cb 86 6f ca  f3 8a ad ba fb 92 e0 c8  |..g...o.........|
000000c0  92 ca f2 62 d9 3b 27 55  a9 62 6c 6f 63 6b 48 61  |...b.;'U.blockHa|
000000d0  73 68 c4 20 b2 20 d4 a8  d1 ed bf 04 8d 41 02 55  |sh. . .......A.U|
000000e0  2a 0e 6e 55 e3 20 bb 1f  b0 45 ea b8 c4 b0 9c 23  |*.nU. ...E.....#|
000000f0  d5 80 9d 64                                       |...d|
000000f4
```
