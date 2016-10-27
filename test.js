var test = require('tape')
var fs = require('fs')
var nixt = require('nixt')
var fixture = fs.readFileSync('./out.css', 'utf8')

// To run tests you need to run `npm i -g` from the root of this module
test('should have correct output', function(t) {
  nixt()
    .expect(function(result) {
      t.equals(result.stdout.trim(), fixture.trim())
    })
    .run('svg-extract-styles ./fixtures')
    .end(t.end)
})
