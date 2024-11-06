const sodium = require('sodium-native')

const delimiter = Buffer.from([0])
const tmp = Buffer.allocUnsafe(4)

module.exports = function id (bundle, out = Buffer.allocUnsafe(32)) {
  const state = Buffer.allocUnsafe(sodium.crypto_generichash_STATEBYTES)

  sodium.crypto_generichash_init(state, null, out.byteLength)

  const files = [...bundle].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)

  for (const [key, data, mode] of files) {
    const buf = Buffer.from(key)

    sodium.crypto_generichash_update(state, tmp.subarray(0, tmp.writeUInt32LE(buf.byteLength)))
    sodium.crypto_generichash_update(state, buf)
    sodium.crypto_generichash_update(state, tmp.subarray(0, tmp.writeUInt32LE(data.byteLength)))
    sodium.crypto_generichash_update(state, data)
    sodium.crypto_generichash_update(state, tmp.subarray(0, tmp.writeUInt16LE(mode)))
    sodium.crypto_generichash_update(state, delimiter)
  }

  sodium.crypto_generichash_final(state, out)

  return out
}
