const { override, fixBabelImports, addWebpackModuleRule } = require('customize-cra');
const { config } = require('dotenv-cra');

config();

const ENV_PREFIX = /^REACT_APP_/i;

const findWebpackPlugin = (plugins, pluginName) =>
  plugins.find((plugin) => plugin.constructor.name === pluginName);

const overrideProcessEnv = () => (config) => {
  const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin');
  const processEnv = plugin.definitions['process.env'] || {};

  const transformedEnv = Object.keys(processEnv)
    .filter((key) => ENV_PREFIX.test(key))
    .reduce((env, key) => {
        const craKey = key.replace('REACT_APP_', '');
        env[craKey] = processEnv[key];
        return env;
    }, {});

  plugin.definitions['process.env'] = {
    ...processEnv,
    ...transformedEnv,
  };

  return config;
};


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
  }),
  overrideProcessEnv(),
);
