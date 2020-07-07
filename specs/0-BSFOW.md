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
| 4     | keyHash    | for encrypted key hash |
| 5     | algorithm  | `AES-GCM` params       |
| 6     | block      | Uint8Array block       |
| 7     | blockHash  | SHA2 (256) on `.block` |

## Sample

```plain
$ hexdump -C test/fixtures/encoded-without-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 88 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 c0 a9  61 6c 67 6f 72 69 74 68  |tadata..algorith|
00000040  6d c0 a4 73 61 6c 74 c0  a7 6b 65 79 48 61 73 68  |m..salt..keyHash|
00000050  c0 a5 62 6c 6f 63 6b c4  06 73 61 6d 70 6c 65 a9  |..block..sample.|
00000060  62 6c 6f 63 6b 48 61 73  68 c4 20 af 2b db e1 aa  |blockHash. .+...|
00000070  9b 6e c1 e2 ad e1 d6 94  f4 1f c7 1a 83 1d 02 68  |.n.............h|
00000080  e9 89 15 62 11 3d 8a 62  ad d1 bf                 |...b.=.b...|
0000008b
```

```plain
$ hexdump -C test/fixtures/encoded-with-encryption.blob
00000000  4d 41 53 4b 42 4f 4f 4b  2d 41 54 54 41 43 48 4d  |MASKBOOK-ATTACHM|
00000010  45 4e 54 88 a7 76 65 72  73 69 6f 6e 00 a4 6d 69  |ENT..version..mi|
00000020  6d 65 aa 74 65 78 74 2f  70 6c 61 69 6e a8 6d 65  |me.text/plain.me|
00000030  74 61 64 61 74 61 c0 a9  61 6c 67 6f 72 69 74 68  |tadata..algorith|
00000040  6d 83 a4 6e 61 6d 65 a7  41 45 53 2d 47 43 4d a2  |m..name.AES-GCM.|
00000050  69 76 c4 0c d6 34 db 74  45 48 e2 d5 16 51 b9 ff  |iv...4.tEH...Q..|
00000060  a9 74 61 67 4c 65 6e 67  74 68 cc 80 a4 73 61 6c  |.tagLength...sal|
00000070  74 c4 08 42 93 a7 26 1d  90 7e 3c a7 6b 65 79 48  |t..B..&..~<.keyH|
00000080  61 73 68 c4 20 af 2b db  e1 aa 9b 6e c1 e2 ad e1  |ash. .+....n....|
00000090  d6 94 f4 1f c7 1a 83 1d  02 68 e9 89 15 62 11 3d  |.........h...b.=|
000000a0  8a 62 ad d1 bf a5 62 6c  6f 63 6b c4 16 c0 b5 5e  |.b....block....^|
000000b0  58 77 b8 8a 7c f4 f3 9f  3d 30 27 63 3b 77 d5 2a  |Xw..|...=0'c;w.*|
000000c0  4d 09 c8 a9 62 6c 6f 63  6b 48 61 73 68 c4 20 34  |M...blockHash. 4|
000000d0  54 71 d2 c7 8d 28 bf ce  45 5a 7f 03 2b 04 a1 fe  |Tq...(..EZ..+...|
000000e0  cd 7d fe 13 36 fa 6f f8  28 bc bf 6a ac 65 d3     |.}..6.o.(..j.e.|
000000ef
```
