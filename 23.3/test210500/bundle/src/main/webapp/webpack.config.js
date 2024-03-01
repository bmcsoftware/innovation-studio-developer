const webpack = require('webpack');

module.exports = {
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    sideEffects: true,
    usedExports: false,
    providedExports: false
  },
  externals: [
    {
      rxjs: 'rxjs',
      lodash: '_'
    }
  ]
};
