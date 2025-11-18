const path = require('path');

module.exports = function setupDevServer(app) {
  app.set('view cache', false);

  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');
  const LR_PORT = Number(process.env.LIVERELOAD_PORT);
  const lrserver = livereload.createServer({ port: LR_PORT, host: '0.0.0.0' });
  lrserver.watch(path.join(process.cwd(), 'views'));
  lrserver.watch(path.join(process.cwd(), 'public'));
  lrserver.watch(path.join(process.cwd(), 'src', 'styles'));
  lrserver.watch(path.join(process.cwd(), 'src', 'scripts'));
  app.use(connectLivereload());

  const webpack = require('webpack');
  const webpackConfigFactory = require(path.join(process.cwd(), 'webpack.config.js'));
  const webpackConfig =
    typeof webpackConfigFactory === 'function'
      ? webpackConfigFactory({ mode: 'development' })
      : webpackConfigFactory;
  const compiler = webpack(webpackConfig);

  compiler.hooks.invalid.tap('log', (f) => {
    console.log('Webpack recompilando...', f || 'cambio detectado');
  });
  compiler.hooks.done.tap('log', (stats) => {
    const info = stats.toJson({ all: false, errors: true, warnings: true });
    console.log(`Webpack compilado en ${stats.endTime - stats.startTime}ms`);
    if (info.warnings && info.warnings.length)
      console.warn('Webpack warnings:', info.warnings.length);
    if (info.errors && info.errors.length) console.error('Webpack errors:', info.errors.length);
  });

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      writeToDisk: (filePath) => /\/assets\/scripts\//.test(filePath.replace(/\\/g, '/')),
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
};
