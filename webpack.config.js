const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = (env = {}) => {
  const isProduction = env.mode === 'production' || process.env.NODE_ENV === 'production';

  const entries = {};
  const contextDir = path.resolve(__dirname, 'src');
  const withHMR = (entryPath) => (
    isProduction ? [entryPath] : ['webpack-hot-middleware/client?reload=true&timeout=2000', entryPath]
  );

  // Recorrer src y agregar todas las entradas .js
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (stat.isFile()) {
        if (/\.js$/i.test(name)) {
          const rel = path.relative(contextDir, full).replace(/\\/g, '/');
          const key = rel.replace(/\.(js)$/i, '');
          // Evitar duplicados: última escritura gana
          entries[key] = withHMR(full);
        }
      }
    }
  };
  if (fs.existsSync(contextDir)) walk(contextDir);

  return {
    mode: isProduction ? 'production' : 'development',
    context: contextDir,
    entry: entries,
    cache: isProduction ? false : { type: 'filesystem' },
    experiments: isProduction ? {} : { cacheUnaffected: true },
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/assets/',
      filename: 'assets/[name].js',
      clean: false,
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          type: 'javascript/esm',
          parser: { javascript: { sourceType: 'module' } },
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      !isProduction && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    stats: 'minimal',
  };
};