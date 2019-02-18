#! /usr/bin/env node

import fs from "fs"
import pathModule from "path"
import isWindows from "is-windows"
import program from "commander"
import pkgInfo from "pkginfo"
import Mustache from "mustache"

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

const createFiles = (path, componentName, dumbString, containerString, indexString, options) => {
	const componentsPath = pathModule.resolve(path, "components")
	const dumbComponentPath = pathModule.resolve(componentsPath, `${componentName}.jsx`)
	const containerPath = pathModule.resolve(componentsPath, `${componentName}Container.jsx`)
	const styleSheetPath = pathModule.resolve(componentsPath, options.scss ? `${componentName}.scss` : `${componentName}.css`)
	const indexPath = pathModule.resolve(path, "index.js")

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

const prepareFiles = (componentName) => {
	const dumbPath = pathModule.resolve("/", __dirname, "../patterns/my-component/components/MyComponent.template")
	const containerPath = pathModule.resolve("/", __dirname, "../patterns/my-component/components/MyComponentContainer.template")
	const indexPath = pathModule.resolve("/", __dirname, "../patterns/my-component/index.template")

	const dumbString = fs.readFileSync(dumbPath).toString()
	const containerString = fs.readFileSync(containerPath).toString()
	const indexString = fs.readFileSync(indexPath).toString()

	return [
		dumbString,
		containerString,
		indexString,
	].map((str) => str.replace(/MyComponent/gu, componentName))
}

const addFlowOption = (dumbOptions, containerOptions, componentName) => {
	const flowContainerTags = {
		"flowComponentTyping": "<Props, State>",
		"flowDeclaration": "// @flow",
		"flowDefaultPropsStatic": "static defaultProps = {\n\n\t};",
		"flowPropsType": "type Props = {\n\n};",
		"flowStateType": "type State = {\n\tvalue1: string,\n};",
	}

	const flowDumbTags = {
		"flowDeclaration": "// @flow",
		"flowDefaultPropsOut": `${componentName}.defaultProps = {\n\tvalue1: '',\n};`,
		"flowDumbComponentPropsTyping": ": Props",
		"flowPropsType": "type Props = {\n\tvalue1?: string,\n};",
	}

	dumbOptions = Object.assign(dumbOptions, flowDumbTags)
	containerOptions = Object.assign(containerOptions, flowContainerTags)

	return [
		dumbOptions,
		containerOptions,
	]
}

const addReduxOption = (containerOptions, componentName) => {
	const reduxContainerFlags = {
		"exportedFilename": `connect(mapStateToProps, mapDispatchToProps)(${componentName}Container)`,
		"reduxImportConnect": "import { connect } from 'react-redux';",
		"reduxMapDispatchToProps": "const mapDispatchToProps = dispatch => ({\n\t// action: (input) => dispatch(action(input)),\n});",
		"reduxMapStateToProps": "const mapStateToProps = () => ({}); // or (state) => ({});",
	}

	containerOptions = Object.assign(containerOptions, reduxContainerFlags)

	return containerOptions
}

const cleanUp = (str) => {
	const cleanStr = str.replace(/^\s*[\r\n\n]/gmu, "\n")

	return cleanStr
}

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