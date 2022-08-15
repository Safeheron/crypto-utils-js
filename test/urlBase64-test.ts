'use strict'
import BN = require('bn.js')
import {Hex, UrlBase64} from "..";
import {Rand} from "@safeheron/crypto-rand";
import * as assert from "assert"
import cryptoJS = require('crypto-js')
import {strictEqual} from "assert";

describe('UrlBase64', function () {
    it('Transformation with CryptoJSBytes!', async function () {
        let limit = new BN(1)
        let len = 1000
        limit.ishln(len)
        console.log("limit: ", limit.toString(16))
        while(limit.gtn(1)){
            const r = await Rand.randomBNLt(limit)
            const rHex = r.toString(16)
            let cryptojsBytes = Hex.toCryptoJSBytes(rHex)
            let urlBase64 = UrlBase64.fromCryptoJSBytes(cryptojsBytes)
            let cryptojsBytes_2 = UrlBase64.toCryptoJSBytes(urlBase64)
            let urlBase64_2 = UrlBase64.fromCryptoJSBytes(cryptojsBytes_2)
            console.log("urlBase64  : ", urlBase64)
            console.log("urlBase64_2: ", urlBase64_2)
            assert.strictEqual(cryptojsBytes, cryptojsBytes)
            assert.strictEqual(urlBase64, urlBase64_2)

            const rHex_2 = Hex.fromCryptoJSBytes(cryptojsBytes_2)
            const r_2 = new BN(rHex_2, 16)
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
            const rHex = r.toString(16)
            let bytes = Hex.toBytes(rHex)
            let urlBase64 = UrlBase64.fromBytes(bytes)
            let bytes_2 = UrlBase64.toBytes(urlBase64)
            let urlBase64_2 = UrlBase64.fromBytes(bytes_2)
            console.log("urlBase64  : ", urlBase64)
            console.log("urlBase64_2: ", urlBase64_2)
            assert.strictEqual(bytes, bytes)
            assert.strictEqual(urlBase64, urlBase64_2)

            const rHex_2 = Hex.fromBytes(bytes_2)
            const r_2 = new BN(rHex_2, 16)
            assert.strictEqual(r.toString(16), r_2.toString(16))

            limit.ishrn(1)
        }
    })

    function test_urlBase64(expected_b64: string, exptected_s: string){
        let cjsBytes = UrlBase64.toCryptoJSBytes(expected_b64)
        let s = cryptoJS.enc.Latin1.stringify(cjsBytes)
        assert.strictEqual(s, exptected_s)

        cjsBytes = cryptoJS.enc.Latin1.parse(exptected_s)
        let b64 = UrlBase64.fromCryptoJSBytes(cjsBytes)
        assert.strictEqual(b64, expected_b64)
    }

    it('Common case', async function () {
        let testData = [
            {
                b64: "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu",
                s: 'Many hands make light work.'
            },
            {
                b64: "bGlnaHQgdw..",
                s: 'light w'
            },
            {
                b64: "bGlnaHQgd28.",
                s: 'light wo'
            },
            {
                b64: "bGlnaHQgd29y",
                s: 'light wor'
            },
        ]
        for(let d of testData){
            test_urlBase64(d.b64, d.s)
        }
    })
})



