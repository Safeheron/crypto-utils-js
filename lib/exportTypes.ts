import CryptoJS = require('crypto-js')

type CryptoJSBytes = CryptoJS.C_lib.WordArray

// Export the inner bytes type in the "crypto-js"
export {CryptoJSBytes}

