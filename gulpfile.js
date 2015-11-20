"use strict";
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
// gulp.task("build-dev", ["webpack:build-dev"], function() {
// 	gulp.watch(["src/**/*"], ["webpack:build-dev"]);
// });

// Production build
gulp.task("p", ["webpack:build"]);
gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}})
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gulpUtil.PluginError("webpack:build", err);
		gulpUtil.log("[webpack:build]", stats.toString({
			colors: true,
			chunkModules:false,
		}));
		callback();
	});
});

// // modify some webpack config options
// var myDevConfig = Object.create(webpackConfig);
// myDevConfig.devtool = "sourcemap";
// myDevConfig.debug = true;
//
// // create a single instance of the compiler to allow caching
// var devCompiler = webpack(myDevConfig);
//
// gulp.task("webpack:build-dev", function(callback) {
// 	// run webpack
// 	devCompiler.run(function(err, stats) {
// 		if(err) throw new gulpUtil.PluginError("webpack:build-dev", err);
// 		gulpUtil.log("[webpack:build-dev]", stats.toString({
// 			colors: true
// 		}));
// 		callback();
// 	});
// });

gulp.task("default", ["webpack-dev-server"]);
gulp.task("webpack-dev-server", function(callback) {
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	var serverConfig = Object.create(webpackConfig.devServer);
	serverConfig.contentBase = myConfig.path;

	new webpackDevServer(webpack(myConfig), serverConfig)
	.listen(3000, "localhost", function(err) {
		if(err) throw new gulpUtil.PluginError("webpack-dev-server", err);
		gulpUtil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");
	});
});
