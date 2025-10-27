const crypto = require('bare-crypto')

const DELIM = Buffer.from('\0')
const TMP = Buffer.allocUnsafe(4)

module.exports = function id(bundle) {
  const digest = crypto.createHash('blake2b256')

  const files = [...bundle].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))

  for (let [key, data, mode] of files) {
    key = Buffer.from(key)

    digest
      .update(TMP.subarray(0, TMP.writeUInt32LE(key.byteLength)))
      .update(key)
      .update(TMP.subarray(0, TMP.writeUInt32LE(data.byteLength)))
      .update(data)
      .update(TMP.subarray(0, TMP.writeUInt16LE(mode)))
      .update(DELIM)
  }

  return digest.digest()
}
