var webpack = require("webpack")
var path = require('path')


module.exports = {
	cache:true,
	plugins: [

		//component 裡面有 require 到這些 module 的會被移除
		// new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),

		//component 裡面不用再 require 這些 module
    new webpack.ProvidePlugin({
			$: 'jquery',
			React: 'react',
			ReactDOM: 'react-dom',
		}),
	],

	externals:{
		'jquery': 'jQuery',
		'react': 'React',
		'react-dom': 'ReactDOM'
	},

	context: path.resolve(__dirname,'src'),
	entry: {
		app:    [ path.resolve(__dirname,'src/js/App.jsx')],

		// vendors: ['react','react-dom','jquery']
	},


	output: {
		path: path.resolve(__dirname),
		// path: __dirname + '/dist',
		// publicPath: path.resolve(__dirname),
		filename: 'bundle.js',
		// filename: path.resolve(__dirname, 'bundle.js'),
		// filename: 'js/[name].js',
		// chunkFilename: "[chunkhash].js"
	},


	devServer: {
		contentBase: './',
		// contentBase: './dist',
		// publicPath: './',
		noInfo: true,
		stats: {
			colors: true
		},
	},

	resolve: {
    root: [
			path.resolve(__dirname,'src/js'),
			path.resolve(__dirname,'src/css'),
			path.resolve(__dirname,'node_modules'),
		]
	},
	resolveLoader: {
    root: [
			path.resolve(__dirname,'node_modules')
		]
	},


	module: {
		// noParse: vendorNames,
		loaders: [{
			test: /\.jsx$/,
			loader: 'jsx',
      // include:  __dirname + 'src/js'

		}, {
			test: /\.json$/,
			loader: 'json',
      // include: __dirname + 'src/data'
		}, {
			test: /\.css$/,
			loader: 'style!css!autoprefixer?browsers=last 4 versions',
      // include: __dirname + 'src/css'
		}, {
			test: /\.scss$/,
			loader: 'style!css!autoprefixer?browsers=last 4 versions!sass',
      // include: __dirname + 'src/css'
		}, {
			test: /\.html$/,
			loader: 'file?name=[path][name].html',
      // include: __dirname + 'src'
		}, {
			test: /\.woff$/,
			loader: 'file?name=[path][name].[ext]',
      // include: __dirname + 'src/img'
		}, {
			test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
			loader: 'file?name=[path][name].[ext]',
      // include: __dirname + 'src/img'
		}, {
			test: /\.mp4$/,
			loader: 'file?name=[path][name].[ext]',
      // include: __dirname + 'src/video'
		}]
	}
};
