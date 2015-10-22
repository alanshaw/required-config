var test = require('tape')
var requiredConfig = require('./')

test('Should find required paths for objects', function (t) {
  t.plan(5)

  var obj = {
    a: {
      b: '<REQUIRED>',
      c: 1,
      d: 'Optional'
    },
    b: {
      c: [],
      d: ['<API_KEYS>'],
      e: {
        f: null,
        g: '<USERNAME>'
      }
    },
    c: [
      {a: 'optional', b: {c: '<A THING>'}},
      {a: ['<ARRAY OF THING>'], b: null}
    ]
  }

  var expectedPathStrings = ['a.b', 'b.d.0', 'b.e.g', 'c.0.b.c', 'c.1.a.0']
  var paths = requiredConfig.findRequiredPaths(obj)

  paths.forEach(function (p) {
    var pathString = p.join('.')
    t.ok(expectedPathStrings.indexOf(pathString) > -1, pathString + ' required')
  })

  t.end()
})
