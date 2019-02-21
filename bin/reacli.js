#! /usr/bin/env node

import pathModule from "path"
import program from "commander"
import pkgInfo from "pkginfo"

import { validateName, validatePath } from "../lib/utils/validators"
import { createComponent, createHook } from "../lib/core"

const createElement = async ({ firstParam = null, pathsToComponentsToCreate = [], options = [] }) => {
	// Cmd reacli component <path> creates a component architecture

	const promises = []
	for (let relativePath of pathsToComponentsToCreate) {
		const path = pathModule.resolve(relativePath)

		if (validatePath(path) && validateName(path)) {
			try {
				switch (firstParam) {
				case "component":
					promises.push(createComponent(path, options))
					break;
				case "hook":
					promises.push(createHook(path, options))
					break;
				default:
					program.outputHelp()
					break;
				}
			} catch (error) {
				console.log("ERROR: ", error)
				program.outputHelp()
			}
		}
	}

	await Promise.all(promises)
}

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

	const { args } = program
	const firstParam = args.shift()
	const pathsToComponentsToCreate = args

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

	createElement({ firstParam,
		options,
		pathsToComponentsToCreate })
}

reactCli()

export default reactCli