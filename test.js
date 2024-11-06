const test = require('brittle')
const Bundle = require('bare-bundle')
const id = require('.')

test('basic', (t) => {
  const bundle = new Bundle()
    .write('/foo.js', 'module.exports = require(\'./bar\')', {
      main: true,
      imports: {
        './bar': '/bar.js'
      }
    })
    .write('/bar.js', 'module.exports = 42')

  bundle.id = id(bundle).toString('hex')

  t.comment(bundle.id)
})
