#!/usr/bin/env node

import * as fs from "fs/promises";

import esbuild from "esbuild";
import svelte from "esbuild-svelte";

const outfile = "./bundle.js";

const options = {
	entryPoints: ["./main.js"],
	mainFields: ["svelte", "browser", "module", "main"],
	outfile,
	format: "iife",
	logLevel: "info",
	ignoreAnnotations: true,
	treeShaking: true,
	legalComments: "linked",
	target: "es6",
	minify: true,
	bundle: true,
	sourcemap: "linked",
	supported: {
		"hex-rgba": false,
	},
	plugins: [
		svelte({
			cache: true,
			filterWarnings(warning) {
				if (warning.code.toLowerCase().includes("a11y")) {
					return false;
				}
				return true;
			},
		}),
	],
	write: false,
	// annoying CSS
	external: ["*.png", "*.ttf", "*.svg"],
};

try {
	const regexp = /for((\s?)*)\(((\s?)*)const/g;
	const build = await esbuild.build(options);

	build.outputFiles.forEach((file) => {
		let text = null;
		if (file.path.endsWith("bundle.js")) {
			text = file.text.replace(regexp, "for(let ");
		}
		fs.writeFile(file.path, text || file.contents);
	});
} catch (err) {
	console.error(err);
	process.exit(1);
}
