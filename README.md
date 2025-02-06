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

## API

#### `const buffer = id(bundle)`

## License

Apache-2.0
