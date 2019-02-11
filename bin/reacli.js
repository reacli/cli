#! /usr/bin/env node

import fs from "fs"
import pathModule from "path"
import isWindows from "is-windows"

// Validate name
const validateName = (path) => {
	console.log(`Valid: ${path}`)

	return true
}

// Validate path
const validatePath = (path) => {
	console.log(`Valid: ${path}`)

	return true
}

const getFolderName = (path) => {
	if (isWindows()) {
		const splitString = path.split("\\")

		return splitString[splitString.length - 1]
	}

	const splitString = path.split("/")

	return splitString[splitString.length - 1]
}

const makeComponentName = (folderName) => folderName
	.split("-")
	.map((word) => word[0].toUpperCase() + word.substr(1))
	.join("")

const makePath = (path) => {
	const realPath = pathModule.join(".", path)

	if (isWindows()) {
		return pathModule.win32.normalize(realPath)
	}

	return realPath
}

const createFiles = (path, componentName, dumbString, containerString, indexString) => {
	const componentsPath = makePath(pathModule.join(path, "components"))
	const dumbComponentPath = makePath(pathModule.join(componentsPath, `${componentName}.jsx`))
	const containerPath = makePath(pathModule.join(componentsPath, `${componentName}Container.jsx`))
	const styleSheetPath = makePath(pathModule.join(componentsPath, `${componentName}.css`))
	const indexPath = makePath(pathModule.join(path, "index.js"))

	fs.writeFile(indexPath, indexString, "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log("Index created !")
	})

	fs.writeFile(dumbComponentPath, dumbString, "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log("Dumb component created !")
	})

	fs.writeFile(containerPath, containerString, "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log("Container component created !")
	})

	fs.writeFile(styleSheetPath, "", "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log("StyleSheet created !")
	})
}

const parseDumbComponent = (componentName) => {
	const filePath = makePath("./patterns/my-component/components/MyComponent.template")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/gu, componentName)
}

const parseContainer = (componentName) => {
	const filePath = makePath("./patterns/my-component/components/MyComponentContainer.template")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/gu, componentName)
}

const parseIndex = (componentName) => {
	const filePath = makePath("./patterns/my-component/index.js")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/gu, componentName)
}

const applyFlowOption = (dumbString, containerString, componentName) => {
	containerString = containerString.replace(/\[\[flow-declaration\]\]/gu, "// @flow")
	containerString = containerString.replace(/\[\[flow-props-type\]\]/gu, "type Props = {\n\n};");
	containerString = containerString.replace(/\[\[flow-state-type\]\]/gu, "type State = {\n\tvalue1: string,\n};");
	containerString = containerString.replace(/\[\[flow-component-typing\]\]/gu, "<Props, State>");
	containerString = containerString.replace(/\[\[flow-default-props-static\]\]/gu, "static defaultProps = {\n\n\t};");

	dumbString = dumbString.replace(/\[\[flow-declaration\]\]/gu, "// @flow")
	dumbString = dumbString.replace(/\[\[flow-props-type\]\]/gu, "type Props = {\n\tvalue1?: string,\n};");
	dumbString = dumbString.replace(/\[\[flow-dumb-component-props-typing\]\]/gu, ": Props")
	dumbString = dumbString.replace(/\[\[flow-default-props-out\]\]/gu, `${componentName}.defaultProps = {\n\tvalue1: '',\n};`);

	return [
		dumbString,
		containerString,
	]
}

const dismissFlowOption = (dumbString, containerString) => {
	containerString = containerString.replace(/\[\[flow-declaration\]\]/gu, "").trim()
	containerString = containerString.replace(/\[\[flow-props-type\]\]/gu, "").trim()
	containerString = containerString.replace(/\[\[flow-state-type\]\]/gu, "").trim()
	containerString = containerString.replace(/\[\[flow-component-typing\]\]/gu, "")
	containerString = containerString.replace(/\[\[flow-default-props-static\]\]/gu, "").trim()
	// Remove empty lines : containerString = containerString.replace(/^\s*[\r\n\n]/gm, "\n")

	dumbString = dumbString.replace(/\[\[flow-declaration\]\]/gu, "").trim()
	dumbString = dumbString.replace(/\[\[flow-props-type\]\]/gu, "").trim()
	dumbString = dumbString.replace(/\[\[flow-dumb-component-props-typing\]\]/gu, "")
	dumbString = dumbString.replace(/\[\[flow-default-props-out\]\]/gu, "").trim()
	// Remove empty lines : dumbString = dumbString.replace(/^\s*[\r\n\n]/gm, '\n')

	return [
		dumbString,
		containerString,
	]
}

const createComponent = (path, options) => {
	const folderName = getFolderName(path)
	const componentName = makeComponentName(folderName)

	const componentsPath = makePath(pathModule.join(path, "components"))

	// MkdirSync recursive not working
	fs.mkdirSync(path)
	fs.mkdirSync(componentsPath)

	let dumbString = parseDumbComponent(componentName)
	let containerString = parseContainer(componentName)
	const indexString = parseIndex(componentName)

	if (options.flow) {
		[dumbString, containerString] = applyFlowOption(dumbString, containerString, componentName)
	} else {
		[dumbString, containerString] = dismissFlowOption(dumbString, containerString)
	}

	createFiles(path, componentName, dumbString, containerString, indexString)
}

const reactCli = (args) => {
	const firstParam = args.shift()
	const secondParam = args.shift()

	let options = {}
	const useFlow = (/--flow|-f/u).test(args)

	if (useFlow) {
		options = Object.assign(options, { flow: true })
	}

   // Cmd reacli component <path> creates a component architecture
	if (firstParam === "component") {
		const path = makePath(secondParam)

		if (validatePath(path) && validateName(path)) {
			try {
				createComponent(path, options)
			} catch (error) {
				console.log("ERROR: ", error)
			}
		}
	}
}

const args = process.argv.splice(2)
reactCli(args)

export default reactCli