# bare-bundle-id

Construct a unique ID for a bundle.

```
npm i bare-bundle-id
```

## Usage

```js
const Bundle = require('bare-bundle')
const id = require('bare-bundle-id')

const bundle = new Bundle()
  .write('/foo.js', "module.exports = require('./bar')", {
    main: true,
    imports: {
      './bar': '/bar.js'
    }
  })
  .write('/bar.js', 'module.exports = 42')

bundle.id = id(bundle).toString('hex')
// 33824862...
```

<!-- bare-refgen:api start -->

## API

### Functions

#### `id(bundle: Bundle): Buffer`

Returns a 32-byte BLAKE2b hash of `bundle`'s sorted file entries (path, contents, and mode), uniquely identifying the bundle's contents.

**Parameters**

| Parameter | Type     | Default | Description                                                                                                                                                                                             |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bundle`  | `Bundle` | —       | The [`bare-bundle`](https://github.com/holepunchto/bare-bundle) instance to hash; its file entries are sorted by path before hashing, so the ID is stable regardless of the order they were written in. |

<!-- bare-refgen:api end -->

## License

Apache-2.0
