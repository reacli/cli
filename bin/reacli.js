#! /usr/bin/env node

import pathModule from "path"
import program from "commander"
import pkgInfo from "pkginfo"
import chalk from "chalk"
import figlet from "figlet"

import { createComponent, createHook, loadReacliConfigurationFileIfNotIgnored } from "../lib/core"
import interactiveCLI from "../lib/interactiveCLI"
import { validatePath, validateName } from "../lib/utils/validators"

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

const reactCli = async () => {

	// Welcome message
	console.log(chalk.green(figlet.textSync("Reacli", {
		horizontalLayout: "default",
		verticalLayout: "default",
	})));

	pkgInfo(module, "version");
	const cliVersion = module.exports.version;

	// Define cli options
	program
		.version(cliVersion)
		.option("-f, --flow", "Add flow to the template")
		.option("--scss", "Use SCSS instead of classic css")
		.option("--redux", "Add Redux to the template")
		.option("-i, --ignore-config-file", "Ignore the '.reacli' optional configuration file")
		.parse(process.argv)

	let options = {}
	const { args } = program

	if (!args.length) {
		options = await interactiveCLI(program.ignoreConfigFile, options)
	}

	const firstParam = args.shift()
	const pathsToComponentsToCreate = args

	if (program.flow) {
		options = Object.assign(options, { flow: true })
	}
	if (program.scss) {
		options = Object.assign(options, { scss: true })
	}
	if (program.redux) {
		options = Object.assign(options, { redux: true })
	}

	options = await loadReacliConfigurationFileIfNotIgnored(program.ignoreConfigFile, process.cwd(), options)

	createElement({
		firstParam,
		options,
		pathsToComponentsToCreate,
	})
}

reactCli()

export default reactCli