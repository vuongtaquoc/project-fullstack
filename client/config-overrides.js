const { override, fixBabelImports, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addWebpackModuleRule({
    test: [/\.css$/, /\.less$/],
    use: ['style-loader', 'css-loader', 'postcss-loader', {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
        }
      }
    }]
  })
);
