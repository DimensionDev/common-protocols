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
