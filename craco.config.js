const CracoLessPlugin = require('craco-less');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
      alias: {
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@config': path.resolve(__dirname, 'src/config'),
          '@pages': path.resolve(__dirname, 'src/pages'),
          '@router': path.resolve(__dirname, 'src/router'),
          '@com': path.resolve(__dirname, 'src/components'),
          '@img': path.resolve(__dirname, 'src/img'),
          '@axios': path.resolve(__dirname, 'src/axios'),
          '@store': path.resolve(__dirname, 'src/store')
      },
      plugins: {
        add: [
          new webpack.ProgressPlugin({
              activeModules: false,
              entries: true,
              handler(percentage, message, ...args) {
                  console.info(`进度：${(percentage * 100).toFixed(2)}%`, message, ...args);
              },
              modules: true,
              modulesCount: 5000,
              profile: false,
              dependencies: true,
              dependenciesCount: 10000,
              percentBy: null,
          }),
        ],  
      },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    presets: [
        "@babel/preset-env"
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],

    ],
  },
};