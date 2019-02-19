
import Mustache from "mustache"
import fs from "fs"
import pathModule from "path"

import cleanUp from "./utils/clean_up"
import { getFolderName, makeComponentName, createFiles, prepareFiles } from "./utils/files"
import { addFlowOption } from "./flow"
import { addReduxOption } from "./redux"

const createComponent = (path, options) => {
	const folderName = getFolderName(path)
	const componentName = makeComponentName(folderName)

	const componentsPath = pathModule.resolve(path, "components")

	// MkdirSync recursive not working
	fs.mkdirSync(path)
	fs.mkdirSync(componentsPath)

	let [dumbString, containerString, indexString] = prepareFiles(componentName)

	let dumbOptions = {}
	let containerOptions = {
		"exportedFilename": `${componentName}Container`,
	}

	if (options.flow) {
		[dumbOptions, containerOptions] = addFlowOption(dumbOptions, containerOptions, componentName)
		console.log("Flow option activated !")
	}

	if (options.redux) {
		containerOptions = addReduxOption(containerOptions, componentName)
		console.log("Redux option activated !")
	}

	if (options.scss) {
		dumbString = dumbString.replace(new RegExp(`./${componentName}.css`, "u"), `./${componentName}.scss`)
	}

	dumbString = cleanUp(Mustache.render(dumbString, dumbOptions))
	containerString = cleanUp(Mustache.render(containerString, containerOptions))

	createFiles(path, componentName, dumbString, containerString, indexString, options)
}

export { createComponent }