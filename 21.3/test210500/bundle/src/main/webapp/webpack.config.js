const webpack = require('webpack');

module.exports = {
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    sideEffects: true,
    minimize: true,
    namedModules: true,
    usedExports: true,
    providedExports: false
  },
  externals: {
    rxjs: 'rxjs',
    lodash: '_'
  }
}
