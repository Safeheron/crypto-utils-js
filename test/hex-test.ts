'use strict'
import BN = require('bn.js')
import {Hex} from "..";
import {Rand} from "@safeheron/crypto-rand";
import * as assert from "assert";
import {expect} from "chai";

describe('Hex', function () {
    it('Transformation with CryptoJSBytes!', async function () {
        let limit = new BN(1)
        let len = 1000
        limit.ishln(len)
        console.log("limit: ", limit.toString(16))
        while(limit.gtn(1)){
            const r = await Rand.randomBNLt(limit)
            let cryptojsBytes = Hex.toCryptoJSBytes(r.toString(16))
            let hex = Hex.fromCryptoJSBytes(cryptojsBytes)
            let cryptojsBytes_2 = Hex.toCryptoJSBytes(hex)
            let hex_2 = Hex.fromCryptoJSBytes(cryptojsBytes_2)
            console.log("hex  : ", hex)
            console.log("hex_2: ", hex_2)
            assert.strictEqual(cryptojsBytes, cryptojsBytes)
            assert.strictEqual(hex, hex_2)

            const r_2 = new BN(hex_2, 16)
            assert.strictEqual(r.toString(16), r_2.toString(16))

            limit.ishrn(1)
        }
    })

    it('Transformation with bytes: Uint8Array!', async function () {
        let limit = new BN(1)
        let len = 1000
        limit.ishln(len)
        console.log("limit: ", limit.toString(16))
        while(limit.gtn(1)){
            const r = await Rand.randomBNLt(limit)
            let bytes = Hex.toBytes(r.toString(16))
            let hex = Hex.fromBytes(bytes)
            let bytes_2 = Hex.toBytes(hex)
            let hex_2 = Hex.fromBytes(bytes_2)
            console.log(bytes_2)
            console.log("hex  : ", hex)
            console.log("hex_2: ", hex_2)
            assert.strictEqual(bytes, bytes)
            assert.strictEqual(hex, hex_2)

            const r_2 = new BN(hex_2, 16)
            assert.strictEqual(r.toString(16), r_2.toString(16))
            limit.ishrn(1)
        }
    })

    it('Reverse Hex', async function () {
        let s = "12345678"
        let rs = Hex.reverseHex(s)
        assert.strictEqual(rs, "78563412")

        s = "123456"
        rs = Hex.reverseHex(s)
        assert.strictEqual(rs, "563412")

        s = "123456"
        rs = Hex.reverseHex(s)
        assert.strictEqual(rs, "563412")

        s = "1234"
        rs = Hex.reverseHex(s)
        assert.strictEqual(rs, "3412")

        s = "12"
        rs = Hex.reverseHex(s)
        assert.strictEqual(rs, "12")

        s = ""
        rs = Hex.reverseHex(s)
        assert.strictEqual(rs, "")

        // Invalid input
        expect(() => {
            s = "1"
            rs = Hex.reverseHex(s)
            assert.strictEqual(rs, "1")
        }).to.throw("Length of input hex must be even!")
    })

    it('Pad function', async function () {
        let s = "12345678"
        let rs = Hex.pad64(s)
        assert.strictEqual(rs, "0000000000000000000000000000000000000000000000000000000012345678")

        s = "12345678"
        rs = Hex.pad32(s)
        assert.strictEqual(rs, "00000000000000000000000012345678")

        s = "12345678"
        rs = Hex.pad16(s)
        assert.strictEqual(rs, "0000000012345678")

        s = "12345678"
        rs = Hex.pad8(s)
        assert.strictEqual(rs, "12345678")

        s = "2345678"
        rs = Hex.pad8(s)
        assert.strictEqual(rs, "02345678")

        s = "234"
        rs = Hex.pad4(s)
        assert.strictEqual(rs, "0234")

        s = "2"
        rs = Hex.pad2(s)
        assert.strictEqual(rs, "02")

        s = "2345678"
        rs = Hex.padEven(s)
        assert.strictEqual(rs, "02345678")

        expect(() => {
            s = "2345678"
            rs = Hex.pad2(s)
        }).to.throw("Input hex is too long")

        expect(() => {
            s = "2345678"
            rs = Hex.pad4(s)
        }).to.throw("Input hex is too long")

        expect(() => {
            s = "2345678"
            rs = Hex.padLength(s, 6)
        }).to.throw("Input hex is too long")
    })

    it('Common case', async function () {
        let hex = "123456"
        let bytes = Hex.toBytes(hex)
        assert.strictEqual(bytes[0], 0x12)
        assert.strictEqual(bytes[1], 0x34)
        assert.strictEqual(bytes[2], 0x56)
    })
})
