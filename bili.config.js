const pkg = require('./package.json')

const dependencies = pkg.dependencies
  ? ` *
 * Dependencies
${Object.keys(pkg.dependencies)
      .map(name => ` * https://www.npmjs.com/package/${name}\n`)
      .join('')}`
  : ''

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 *
 * (c) ${pkg.year}-present ${pkg.author}
 * Released under the ${pkg.license} License.
${dependencies} */`

module.exports = {
  format: ['es', 'iife', 'iife-min'],
  banner,
  js: 'buble',
  map: false
}
