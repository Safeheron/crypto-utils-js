# crypto-utils-js
# Installation
```shell
npm install @safeheron/crypto-utils
```
Import the library in code:
```javascript
import {Hex, UrlBase64} from "@safeheron/crypto-utils"
```

# Examples
## UrlBase64


- Hex ==> Bytes: number[] ===> Hex
```javascript
const rHex = "172601402494113ab758e822f7c65d0a6730ffdf39f878659c1298f42f7f292092f1e575e2d5b2aca9dbc98f257d315fa1db056076e4"
let bytes = Hex.toBytes(rHex)
let rHex_2 = Hex.fromBytes(bytes)
// => 172601402494113ab758e822f7c65d0a6730ffdf39f878659c1298f42f7f292092f1e575e2d5b2aca9dbc98f257d315fa1db056076e4
```

- Hex ==> CryptoJSBytes ===> Hex
```javascript
const rHex = "172601402494113ab758e822f7c65d0a6730ffdf39f878659c1298f42f7f292092f1e575e2d5b2aca9dbc98f257d315fa1db056076e4"
let cjsBytes = Hex.toCryptoJSBytes(rHex)
let rHex_2 = Hex.fromCryptoJSBytes(cjsBytes)
// => 172601402494113ab758e822f7c65d0a6730ffdf39f878659c1298f42f7f292092f1e575e2d5b2aca9dbc98f257d315fa1db056076e4
```

- UrlBase64 ==> Bytes: number[] ===> UrlBase64
```javascript
const b64 = "FyYBQCSUETq3WOgi98ZdCmcw_985-HhlnBKY9C9_KSCS8eV14tWyrKnbyY8lfTFfodsFYHbk"
let bytes = UrlBase64.toBytes(b64)
// => 172601402494113ab758e822f7c65d0a6730ffdf39f878659c1298f42f7f292092f1e575e2d5b2aca9dbc98f257d315fa1db056076e4
let b64_2 = UrlBase64.fromBytes(bytes)
// => "FyYBQCSUETq3WOgi98ZdCmcw_985-HhlnBKY9C9_KSCS8eV14tWyrKnbyY8lfTFfodsFYHbk"
```

- UrlBase64 ==> CryptoJSBytes ===> UrlBase64
```javascript
const b64 = "FyYBQCSUETq3WOgi98ZdCmcw_985-HhlnBKY9C9_KSCS8eV14tWyrKnbyY8lfTFfodsFYHbk"
let cjsBytes = UrlBase64.toCryptoJSBytes(b64)
let b64_2 = UrlBase64.fromCryptoJSBytes(cjsBytes)
// => "FyYBQCSUETq3WOgi98ZdCmcw_985-HhlnBKY9C9_KSCS8eV14tWyrKnbyY8lfTFfodsFYHbk"
```

- Hex ==> CryptoJSBytes ===> UrlBase64
```javascript
const r = new BN("172601402494113ab758e822f7c65d0a6730ffdf39f878659c1298f42f7f292092f1e575e2d5b2aca9dbc98f257d315fa1db056076e4", 16)
const rHex = r.toString(16)
let bytes = Hex.toCryptoJSBytes(rHex)
let urlBase64 = UrlBase64.fromCryptoJSBytes(bytes)
// => FyYBQCSUETq3WOgi98ZdCmcw_985-HhlnBKY9C9_KSCS8eV14tWyrKnbyY8lfTFfodsFYHbk
```

- Hex ==> Bytes: number[] ===> UrlBase64
```javascript
const r = new BN("172601402494113ab758e822f7c65d0a6730ffdf39f878659c1298f42f7f292092f1e575e2d5b2aca9dbc98f257d315fa1db056076e4", 16)
const rHex = r.toString(16)
let bytes = Hex.toBytes(rHex)
let urlBase64 = UrlBase64.fromBytes(bytes)
// => FyYBQCSUETq3WOgi98ZdCmcw_985-HhlnBKY9C9_KSCS8eV14tWyrKnbyY8lfTFfodsFYHbk
```

- Pad Operations
 
```javascript
// pad64
let s = "12345678"
let rs = Hex.pad64(s)
assert.strictEqual(rs, "0000000000000000000000000000000000000000000000000000000012345678")

// pad32
s = "12345678"
rs = Hex.pad32(s)
assert.strictEqual(rs, "00000000000000000000000012345678")

// pad16
s = "12345678"
rs = Hex.pad16(s)
assert.strictEqual(rs, "0000000012345678")

// pad8
s = "12345678"
rs = Hex.pad8(s)
assert.strictEqual(rs, "12345678")

// pad4
s = "234"
rs = Hex.pad4(s)
assert.strictEqual(rs, "0234")

// pad2
s = "2"
rs = Hex.pad2(s)
assert.strictEqual(rs, "02")

// padEven
s = "2345678"
rs = Hex.padEven(s)
assert.strictEqual(rs, "02345678")

// Input hex is too long 
expect(() => {
    s = "2345678"
    rs = Hex.pad2(s)
}).to.throw("Input hex is too long")

// Input hex is too long 
expect(() => {
    s = "2345678"
    rs = Hex.pad4(s)
}).to.throw("Input hex is too long")

// Input hex is too long 
expect(() => {
    s = "2345678"
    rs = Hex.padLength(s, 6)
}).to.throw("Input hex is too long")
```

- Reverse Hex
 
```javascript
let s = "12345678"
let rs = Hex.reverseHex(s)
assert.strictEqual(rs, "78563412")

// Invalid input
expect(() => {
    s = "1"
    rs = Hex.reverseHex(s)
    assert.strictEqual(rs, "1")
}).to.throw("Length of hex must be even!")
```