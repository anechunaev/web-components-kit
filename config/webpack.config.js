const { resolve } = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Minifier = require('terser-webpack-plugin');

module.exports = (options) => ({
	mode: 'production',
	target: 'web',
	context: resolve(__dirname),
	entry: options.entry,
	output: {
		filename: '[name].js',
		publicPath: '/dist/',
		path: resolve(__dirname, '../dist'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		modules: [
			resolve(__dirname, '../src'),
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							useCahce: true,
							forceIsolatedModules: true,
							reportFiles: [ "src/**/*.{ts,tsx}" ],
							silent: true,
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
			PRODUCTION: JSON.stringify(true),
		}),
		new CheckerPlugin(),
	],
	optimization: {
		minimizer: [
			new Minifier({
				terserOptions: {
					ecma: '8',
				}
			}),
		],
	},
});