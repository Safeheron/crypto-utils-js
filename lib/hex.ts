import CryptoJS = require('crypto-js')
import {CryptoJSBytes} from "./exportTypes"

/**
 * @brief: pad with "0" if the hex.length === 1; no change otherwise.
 *    - situation 1:
 *        "1" => "01"
 *        "f" => "0f"
 *
 *    - situation 1:
 *        "12" => "12"
 *        "ff" => "ff"
 * @param hex
 */
function zero2(hex: string): string{
  if (hex.length === 1) {
    return '0' + hex;
  } else if (hex.length === 2){
    return hex;
  } else {
    throw "Invalid hex length: " + hex.length
  }
}

export class Hex{
  /**
   * Hex ===> Bytes:
   *      "0100ff" => [0x01, 0x00, 0xff]
   *
   * @param hex
   */
  public static toBytes(hex: string): Uint8Array{
    let msg = hex.replace(/[^a-z0-9]+/ig, '');
    msg = Hex.padEven(msg)
    let res = new Uint8Array(msg.length/2)
    for (let i = 0; i < msg.length; i += 2){
      res[i/2] = parseInt(msg.slice(i, i+2), 16)
    }
    return res
  }

  /**
   * Bytes(Uint8Array) ===> Hex:
   *      [0x01, 0x00, 0xff] => "0100ff"
   *
   * @param bytes
   */
  public static fromBytes(bytes: Uint8Array): string {
    var res = '';
    if (bytes.length == 0) return res;
    for (var i = 0; i < bytes.length; i++) {
      res += zero2(bytes[i].toString(16));
    }
    return res;
  }

  /**
   * Hex ===> CryptoJSBytes
   *
   * "1234"     ===> 0x1234
   *  "123"     ===> 0x0123
   *  "120"     ===> 0x0120
   *
   * Use the function to avoid the bugs in "crypto-js"
   *  "123"     ===> 0x1203
   *  "120"     ===> 0x1200
   *
   * More details for the bugs in "crypto-js":
   * - Problem 1
   *   const a = CryptoJS.enc.Hex.parse('d6021ef5d7cccd55cda318fe2bd47334bac0b699e4a6676f8d941f7706d3820')
   *   const expected_a = a.toString(CryptoJS.enc.Hex)
   *   console.log('expected_a:', expected_a)
   *
   *   The result is:
   *   expected_a: d6021ef5d7cccd55cda318fe2bd47334bac0b699e4a6676f8d941f7706d38200
   *
   * - Problem 2
   *   const a = CryptoJS.enc.Hex.parse('d6021ef5d7cccd55cda318fe2bd47334bac0b699e4a6676f8d941f7706d3821')
   *   const expected_a = a.toString(CryptoJS.enc.Hex)
   *   console.log('expected_a:', expected_a)
   *
   *   The result is:
   *   expected_a: d6021ef5d7cccd55cda318fe2bd47334bac0b699e4a6676f8d941f7706d38201
   * @param hex
   */
  public static toCryptoJSBytes(hex: string): CryptoJSBytes{
    return CryptoJS.enc.Hex.parse(Hex.padEven(hex))
  }

  /**
   * Bytes ===> Hex
   * @param bytes
   */
  public static fromCryptoJSBytes(bytes: CryptoJSBytes) :string{
    return CryptoJS.enc.Hex.stringify(bytes)
  }

  /**
   * Reverse hex string byte by byte.
   *     "01234567" ===> "67452301"
   * @param hex
   */
  public static reverseHex(hex: string): string {
    if(hex.length % 2 !== 0){
      throw "Invalid hex: " + hex.length + ". Length of input hex must be even!"
    }
    let bytes = Hex.toBytes(hex)
    var res = '';
    for (let i = bytes.length - 1; i >= 0; i--)
      res += zero2(bytes[i].toString(16));
    return res;
  }

  /**
   * Pad the hex string to the specified length
   * @param hex. For example "01020304"
   * @param expectedLen. For example 16
   * @returns {*} For example "0000000001020304"
   */
  public static padLength (hex:string, expectedLen:number): string {
    if(hex.length > expectedLen){
      throw "Input hex is too long(" + hex.length + " chars). It should be no more than " + expectedLen + " chars according to specified expectedLen."
    }
    while(expectedLen > hex.length) {
      hex = '0' + hex
    }
    return hex
  }

  /**
   * Pad to 64 chars long
   * @param hex
   * @returns {*}
   */
  public static pad64(hex: string): string {
    return Hex.padLength(hex, 64)
  }

  /**
   * Pad to 32 chars long
   * @param hex
   * @returns {*}
   */
  public static pad32(hex: string): string {
    return Hex.padLength(hex, 32)
  }

  /**
   * Pad to 16 chars long
   * "12345678" => "0000000012345678"
   * @param hex
   * @returns {*}
   */
  public static pad16(hex: string): string {
    return Hex.padLength(hex, 16)
  }

  /**
   * Pad to 8 chars long
   * "1234567" => "01234567"
   * @param hex
   * @returns {*}
   */
  public static pad8(hex: string): string {
    return Hex.padLength(hex, 8)
  }

  /**
   * Pad to 4 chars long
   * "1" => "0001"
   * @param hex
   * @returns {*}
   */
  public static pad4(hex: string): string {
    return Hex.padLength(hex, 4)
  }

  /**
   * Pad to 2 chars long
   * "1" => "01"
   * @param hex
   * @returns {*}
   */
  public static pad2(hex: string): string {
    return Hex.padLength(hex, 2)
  }

  /**
   * Pad to even chars.
   * "123" => "0123"
   * @param hex
   * @returns {*}
   */
  public static padEven(hex: string): string {
    if(hex.length % 2 !== 0){
      hex = '0' + hex
    }
    return hex
  }
}

