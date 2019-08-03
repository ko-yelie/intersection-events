module.exports = {
  babel: {
    minimal: true
  },
  banner: require('banner-package'),
  output: {
    moduleName: 'IntersectionEvents',
    format: ['es', 'iife', 'iife-min'],
    sourceMap: false
  }
}
