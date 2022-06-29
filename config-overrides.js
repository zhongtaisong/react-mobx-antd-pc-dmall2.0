const { 
    override, fixBabelImports, addLessLoader,
    addWebpackAlias, addDecoratorsLegacy, addWebpackPlugin,
    adjustStyleLoaders,
} = require('customize-cra');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1890ff' },
            math: "always",
        },
    }),
    addWebpackAlias({
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@com': path.resolve(__dirname, 'src/components'),
        '@img': path.resolve(__dirname, 'src/img'),
        '@axios': path.resolve(__dirname, 'src/axios'),
        '@store': path.resolve(__dirname, 'src/store')
    }),
    addDecoratorsLegacy(),
    addWebpackPlugin(new webpack.ProgressPlugin({
        activeModules: false,
        entries: true,
        handler(percentage, message, ...args) {
          console.info(`进度：${(percentage * 100)?.toFixed?.(2)}%`, message, ...args);
        },
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null,
    })),
    addWebpackPlugin(new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    })),
    adjustStyleLoaders(({ use: [, , postcss] }) => {
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
    }),
);