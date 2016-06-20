var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var mdrender = require('../../markdown-render.js')

module.exports = function () {
  var problem = {}
  problem.requireSubmission = false
  problem.problem = mdrender(fs.readFileSync(path.join(__dirname, 'problem.md')).toString()) + '\n'
  problem.solution = 'Run "elementary-electron" again to select the next challenge.\n'

  problem.verify = function (args, cb) {
    try {
      fs.statSync(path.join(process.cwd(), 'index.js'))
      fs.statSync(path.join(process.cwd(), 'node_modules', 'cat-picture'))
      fs.statSync(path.join(process.cwd(), 'node_modules', 'lightning-image-poly'))
    } catch (err) {
      console.error('\nFailed to find index.js and ./node_modules/cat-picture and ./node_modules/lightning-image-poly')
      return cb(false)
    }
    cb(true)
  }

  problem.pass = '\n' + chalk.green('SUCCESS!') + ' Run elementary-electron again to select the next challenge'
  problem.fail = '\n' + chalk.red('FAIL!') + ' Your app has some issues.'
  problem.run = function (args) {
    console.error('Run is not necessary in this challenge')
  }
  return problem
}
