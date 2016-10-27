#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var dom = require('cheerio')
var args = process.argv.slice(2)
var $
var dir
var file
var fileName
if (args && args.length) {
  dir = args[0]
  fs.readdir(dir, function(err, files) {
    if (err) {
      process.stderr(err)
      return
    }
    files.forEach(function(file) {
      if (path.extname(file) === '.svg') {
        fileName = file.slice(0, -4)
        file = fs.readFileSync(path.join(dir, file), 'utf8')
        $ = dom.load(file)
        $('svg')
          .children()
          .each(
            function(i, kid) {
              var kidNode = $(kid)
              var fill = kidNode.attr('fill')
              var stroke = kidNode.attr('stroke')
              if (fill || stroke) {
                process.stdout.write(getSelector(fileName, fill, stroke))
              }
            }
          )
      }
    })
  })
}
else {
  process.stderr('Directory not found.')
}

function getFill(value) {
  return value && value !== 'none'? `\n  fill: ${value};`: ''
}

function getStroke(value) {
  return value && value !== 'none'? `\n  stroke: ${value};`: ''
}

function getSelector(fileName, fill, stroke) {
  var selector = `.icon-${fileName} {` + `${getFill(fill)}` + `${getStroke(stroke)}` + '\n}\n'
  return selector
}
