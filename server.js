var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: './public',
  publicPath: config.output.publicPath,
  hot: true,
  
  proxy: {
    '/*': {
        target: 'http://devops.panli.com',
        secure: false,
        changeOrigin: true
    }
  },
  historyApiFallback: true
}).listen(3000, 'localhost', function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});
