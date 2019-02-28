
import Mustache from "mustache"
import fs from "fs"
import pathModule from "path"
import pkgDir from "pkg-dir"
import program from "commander"
import chalk from "chalk"

import cleanUp from "./utils/clean_up"
import { getFolderName, makeComponentName, createFiles, prepareFiles } from "./utils/files"
import { validateName, validatePath } from "../lib/utils/validators"
import { addFlowOption } from "./flow"
import { addReduxOption } from "./redux"

const loadOptionsInConfigFileIfExists = async (path, options, componentName) => {
	const packageRootDir = await pkgDir(path);
	const reacliConfigFileExists = fs.existsSync(`${packageRootDir}/.reacli`)

	if (reacliConfigFileExists) {
		console.log(chalk.black.bgBlue(`${componentName ? `[${componentName}] ` : ""}Reacli configuration file found at '${packageRootDir}'.`))
		options = Object.assign(options, JSON.parse(fs.readFileSync(`${packageRootDir}/.reacli`, "utf8")))
	}

	return options
}

const loadReacliConfigurationFileIfNotIgnored = async (ignoreConfigFile, path, options, componentName = "") => {
	if (ignoreConfigFile) {
		console.log(chalk.black.bgBlue("Ignore the optional Reacli configuration file."))
	} else {
		options = await loadOptionsInConfigFileIfExists(path, options, componentName)
	}

	return options
}

const createValidComponent = (path, options) => {
	const folderName = getFolderName(path)
	const componentName = makeComponentName(folderName)

	const componentsPath = pathModule.resolve(path, "components")

	// MkdirSync recursive not working
	fs.mkdirSync(path)
	fs.mkdirSync(componentsPath)

	let [dumbString, containerString, indexString] = prepareFiles(componentName)

	let dumbTags = {}
	let containerTags = {
		"exportedFilename": `${componentName}Container`,
	}

	if (options.flow) {
		[dumbTags, containerTags] = addFlowOption(dumbTags, containerTags, componentName)
		console.log(chalk.black.bgGreen(`[${componentName}] Flow option activated !`))
	}

	if (options.redux) {
		containerTags = addReduxOption(containerTags, componentName)
		console.log(chalk.black.bgGreen(`[${componentName}] Redux option activated !`))
	}

	if (options.scss) {
		dumbString = dumbString.replace(new RegExp(`./${componentName}.css`, "u"), `./${componentName}.scss`)
	}

	dumbString = cleanUp(Mustache.render(dumbString, dumbTags))
	containerString = cleanUp(Mustache.render(containerString, containerTags))

	createFiles(path, componentName, dumbString, containerString, indexString, options)
}

const createComponent = (path, options) => {
	if (validatePath(path) && validateName(path)) {
		try {
			createValidComponent(path, options)
		} catch (error) {
			console.log(chalk.black.bgRed("ERROR: ", error))
			program.outputHelp()
		}
	}
}

export { createComponent, loadReacliConfigurationFileIfNotIgnored }