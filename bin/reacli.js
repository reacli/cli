#! /usr/bin/env node

import pathModule from "path"
import program from "commander"
import pkgInfo from "pkginfo"

import { validateName, validatePath } from "../lib/utils/validators"
import { createComponent } from "../lib/core"


const reactCli = () => {

	pkgInfo(module, "version");
	const cliVersion = module.exports.version;

	// Define cli options
	program
		.version(cliVersion)
		.option("-f, --flow", "Add flow to the template")
		.option("--scss", "Use SCSS instead of classic css")
		.option("--redux", "Add Redux to the template")
		.parse(process.argv)

	const { args } = program;
	const firstParam = args.shift();
	const secondParam = args.shift();

	let options = {}
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

		if (validatePath(path) && validateName(path)) {
			try {
				createComponent(path, options)
			} catch (error) {
				console.log("ERROR: ", error)
				program.outputHelp()
			}
		}
	}
}

reactCli()

export default reactCli