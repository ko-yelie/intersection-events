const pkg = require('./package.json')

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 *
 * @license
 * Copyright (c) 2018 ${pkg.author}
 * Released under the MIT license
 */`

const otherBanner = `
/*! npm.im/noop-es2015 */
/*! npm.im/get-elements-array */`

module.exports = {
  format: ['es', 'iife', 'iife-min'],
  moduleName: 'IntersectionEvents',
  banner: banner + otherBanner,
  js: 'buble',
  map: false
}
