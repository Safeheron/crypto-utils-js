/**
 * Convert binary data to and from UrlBase64 encoding.
 * This is identical to Base64 encoding, except that the padding character is "." and the other
 * non-alphanumeric characters are "-" and "_" instead of "+" and "/".
 * The purpose of UrlBase64 encoding is to provide a compact encoding of binary data that is safe
 * for use as an URL parameter. Base64 encoding does not produce encoded values that are safe for
 * use in URLs, since "/" can be interpreted as a path delimiter; "+" is the encoded form of a space;
 * and "=" is used to separate a name from the corresponding value in an URL parameter.
 */

import CryptoJS = require('crypto-js')
import {CryptoJSBytes} from "./exportTypes"
import {Hex} from "./hex";

export class UrlBase64 {
    /**
     * UrlBase64 ===> Bytes:
     * @param urlBase64
     */
    public static toBytes(urlBase64: string): Uint8Array{
        // UrlBase64 ==> CryptoJSBytes ==> Hex ==> Bytes: Uint8Array
        return Hex.toBytes(Hex.fromCryptoJSBytes(UrlBase64.toCryptoJSBytes(urlBase64)))
    }

    /**
     * Bytes(Uint8Array) ===> UrlBase64:
     * @param bytes
     */
    public static fromBytes(bytes: Uint8Array): string{
        // Bytes: Uint8Array ==> Hex ==> CryptoJSBytes ==> UrlBase64
        return UrlBase64.fromCryptoJSBytes(Hex.toCryptoJSBytes(Hex.fromBytes(bytes)))
    }

    /**
     * UrlBase64 ===> CryptoJSBytes:
     * @param urlBase64
     */
    public static toCryptoJSBytes(urlBase64: string): CryptoJSBytes{
        let base64 = urlBase64.replace(/\./g, '=').replace(/-/g, '+').replace(/_/g, '/')
        return CryptoJS.enc.Base64.parse(base64)
    }

    /**
     * CryptoJSBytes ===> UrlBase64:
     * @param bytes
     */
    public static fromCryptoJSBytes(bytes: CryptoJSBytes) :string{
        let base64 = CryptoJS.enc.Base64.stringify(bytes)
        return base64.replace(/=/g, '.').replace(/\+/g, '-').replace(/\//g, '_')
    }
}

