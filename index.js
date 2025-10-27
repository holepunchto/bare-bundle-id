const sodium = require('sodium-native')

const slab = Buffer.allocUnsafe(
  1 + // Delimiter
    4 + // Temporary
    sodium.crypto_generichash_STATEBYTES
)

const delim = slab.subarray(0, 1).fill(0)
const tmp = slab.subarray(1, 5)
const state = slab.subarray(5)

module.exports = function id(bundle, out = Buffer.allocUnsafe(32)) {
  sodium.crypto_generichash_init(state, null, out.byteLength)

  const files = [...bundle].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))

  for (const [key, data, mode] of files) {
    const buf = Buffer.from(key)

    sodium.crypto_generichash_update(state, tmp.subarray(0, tmp.writeUInt32LE(buf.byteLength)))

    sodium.crypto_generichash_update(state, buf)

    sodium.crypto_generichash_update(state, tmp.subarray(0, tmp.writeUInt32LE(data.byteLength)))

    sodium.crypto_generichash_update(state, data)

    sodium.crypto_generichash_update(state, tmp.subarray(0, tmp.writeUInt16LE(mode)))

    sodium.crypto_generichash_update(state, delim)
  }

  sodium.crypto_generichash_final(state, out)

  return out
}
