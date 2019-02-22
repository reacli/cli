
import Mustache from "mustache"
import fs from "fs"
import pathModule from "path"
import pkgDir from "pkg-dir"

import cleanUp from "./utils/clean_up"
import { getFolderName, makeComponentName, createFiles, prepareFiles } from "./utils/files"
import { addFlowOption } from "./flow"
import { addReduxOption } from "./redux"

const createComponent = async (path, options) => {
	const folderName = getFolderName(path)
	const componentName = makeComponentName(folderName)

	const componentsPath = pathModule.resolve(path, "components")

	const packageRootDir = await pkgDir(__dirname);
	const reacliConfigFileExists = fs.existsSync(`${packageRootDir}/.reacli`)

	if (reacliConfigFileExists) {
		console.log(`Reacli configuration file found at '${packageRootDir}'.`)
		options = Object.assign(options, JSON.parse(fs.readFileSync(`${packageRootDir}/.reacli`, "utf8")))
	}

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
		console.log("Flow option activated !")
	}

	if (options.redux) {
		containerTags = addReduxOption(containerTags, componentName)
		console.log("Redux option activated !")
	}

	if (options.scss) {
		dumbString = dumbString.replace(new RegExp(`./${componentName}.css`, "u"), `./${componentName}.scss`)
	}

	dumbString = cleanUp(Mustache.render(dumbString, dumbTags))
	containerString = cleanUp(Mustache.render(containerString, containerTags))

	createFiles(path, componentName, dumbString, containerString, indexString, options)
}

export { createComponent }