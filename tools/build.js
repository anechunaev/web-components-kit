const webpack = require('webpack');
const config = require('../config/webpack.config');
const { resolve } = require('path');

webpack(config({
	entry: {
		button: resolve(__dirname, '../src/lib/button/index.tsx'),
	},
}), (err, stats) => {
	if (err) {
		console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
		return;
	}

	const info = stats.toJson();

	if (stats.hasErrors()) {
		if (Array.isArray(info.errors)) {
			info.errors.forEach(error => console.error(error));
		} else {
			console.error(info.errors);
		}
	}

	if (stats.hasWarnings()) {
		if (Array.isArray(info.warnings)) {
			info.warnings.forEach(warn => console.warn(warn));
		} else {
			console.warn(info.warnings);
		}
	}

	/* console.log("Stats:");
	console.log(stats); */
});