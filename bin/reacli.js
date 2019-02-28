#! /usr/bin/env node

import pathModule from "path"
import program from "commander"
import pkgInfo from "pkginfo"
import chalk from "chalk"
import figlet from "figlet"

import { createComponent, loadOptionsInConfigFileIfExists } from "../lib/core"
import interactiveCLI from "../lib/interactiveCLI"


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
		.parse(process.argv)

	let options = {}
	const { args } = program

	if (!args.length) {
		options = await interactiveCLI()
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

	// Cmd reacli component <path> creates a component architecture
	if (firstParam === "component") {
		options = await loadOptionsInConfigFileIfExists(process.cwd(), options)

		for (let relativePath of pathsToComponentsToCreate) {
			const path = pathModule.resolve(relativePath)
			createComponent(path, options)
		}

	}
}

reactCli()

export default reactCli