
import Mustache from "mustache"
import fs from "fs"
import pathModule from "path"
import pkgDir from "pkg-dir"
import chalk from "chalk"

import cleanUp from "./utils/clean_up"
import { getFolderName, makeComponentName, createFiles, prepareFiles } from "./utils/files"
import { createHookFiles, prepareHookFiles } from "./utils/hookFiles"
import { addFlowOption } from "./flow"
import { addReduxOption } from "./redux"

const loadOptionsInConfigFile = async (path, options = {}, componentName = "") => {
	const packageRootDir = await pkgDir(path);
	const reacliConfigFileExists = fs.existsSync(`${packageRootDir}/.reacli`)

	if (reacliConfigFileExists) {
		console.log(chalk.black.bgBlue(`${componentName ? `[${componentName}] ` : ""}Reacli configuration file found at '${packageRootDir}'.`))
		options = Object.assign(options, JSON.parse(fs.readFileSync(`${packageRootDir}/.reacli`, "utf8")))
	}

	return options
}

const loadReacliConfiguration = async (path, options, ignoreConfigFile = false, componentName = "") => {
	if (ignoreConfigFile) {
		console.log(chalk.black.bgBlue("Ignore the optional Reacli configuration file."))
	} else {
		options = await loadOptionsInConfigFile(path, options, componentName)
	}

	return options
}

const createComponent = (path, options) => {
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
		console.log(chalk.black.bgGreen(`[${componentName}] SCSS option activated !`))
		dumbString = dumbString.replace(new RegExp(`./${componentName}.css`, "u"), `./${componentName}.scss`)
	}

	dumbString = cleanUp(Mustache.render(dumbString, dumbTags))
	containerString = cleanUp(Mustache.render(containerString, containerTags))

	createFiles(path, componentName, dumbString, containerString, indexString, options)
}

const createHook = (path, options) => {
	const folderName = getFolderName(path)
	const hookName = makeComponentName(folderName)

	const hooksPath = pathModule.resolve(path, "hooks")

	fs.mkdirSync(path)
	fs.mkdirSync(hooksPath)

	let [dumbString, indexString] = prepareHookFiles(hookName)

	dumbString = cleanUp(Mustache.render(dumbString))

	if (options.scss) {
		console.log(chalk.black.bgGreen(`[${hookName}] SCSS option activated !`))
	}

	createHookFiles({ dumbString,
		hookName,
		indexString,
		options,
		path })
}

export { createHook, createComponent, loadReacliConfiguration }
