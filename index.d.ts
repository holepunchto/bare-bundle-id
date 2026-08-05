import Bundle from 'bare-bundle'
import Buffer from 'bare-buffer'

/**
 * Returns a 32-byte BLAKE2b hash of `bundle`'s sorted file entries (path, contents, and mode), uniquely identifying the bundle's contents.
 * @param bundle - The [`bare-bundle`](https://github.com/holepunchto/bare-bundle) instance to hash; its file entries are sorted by path before hashing, so the ID is stable regardless of the order they were written in.
 */
declare function id(bundle: Bundle): Buffer

export = id
