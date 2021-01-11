'use strict'

const { Base64 } = require('js-base64')

/**
 * Encode any id
 * @param {Integer} value Number id to encode
 * @version 1.0
 * @return {String} Any encode String
 */
const enCode = value => {
    const v = ((((value * 998161) * 793927) * 562841) * 288413) / 472793
    return Base64.encode(`${v}`)
}

/**
 * Decode any string id
 * @param {String} value String to decode
 * @version 1.0
 * @return {Integer} ID number decode
 */
const deCode = value => {
    const v = Base64.decode(value)
    return Math.round(((((v * 472793) / 288413) / 562841) / 793927) / 998161)
}

module.exports = {
    enCode,
    deCode
}