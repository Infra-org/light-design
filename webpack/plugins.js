const MiniProgramPlugin = require('mini-program-webpack-loader').plugin
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolve, copyAppJson } = require('./utils')

module.exports = [
	new IgnoreEmitPlugin('.DS_Store'),
	new MiniProgramPlugin({
		extfile: false,
		compilationFinish () {
			copyAppJson()
		}
	}),
	new CopyWebpackPlugin({
		patterns: [
			{
				from: resolve('miniprogram/**/*.(svg|png|jpe?g|gif)'),
				to: '[path][name].[ext]'
			},
			{
				from: resolve('miniprogram/sitemap.json'),
				to: resolve('dist/sitemap.json')
			}
		]
	})
]
