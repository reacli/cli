#! /usr/bin/env node

import pathModule from "path"
import program from "commander"
import pkgInfo from "pkginfo"

import { createComponent } from "../lib/core"
import { interactiveCLI } from "../lib/interactiveCLI";


const reactCli = async () => {

	pkgInfo(module, "version");
	const cliVersion = module.exports.version;

	// Define cli options
	program
		.version(cliVersion)
		.option("-f, --flow", "Add flow to the template")
		.option("--scss", "Use SCSS instead of classic css")
		.option("--redux", "Add Redux to the template")
		.parse(process.argv)

	let options = {}

	const { args } = program;

	if (!args.length) {
		options = await interactiveCLI(options)
	}

	const firstParam = args.shift()
	const secondParam = args.shift()

	if (program.flow) {
		options = Object.assign(options, { flow: true })
	}
	if (program.scss) {
		options = Object.assign(options, { scss: true })
	}
	if (program.redux) {
		options = Object.assign(options, { redux: true })
	}

	// Cmd reacli component <path> creates a component architecture
	if (firstParam === "component") {
		const path = pathModule.resolve(secondParam)
		await createComponent(path, options)
	}
}

reactCli()

export default reactCli