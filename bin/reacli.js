#! /usr/bin/env node

import fs from "fs"
import pathModule from "path"
import isWindows from "is-windows"
<<<<<<< HEAD
import program from "commander"
import pkgInfo from "pkginfo"
=======
import format from "string-template"
import Mustache from "mustache"
>>>>>>> feat: add mustache and string-template for flow to compare them

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

const parseDumbComponent = (componentName) => {
	const filePath = pathModule.resolve("/", __dirname, "../patterns/my-component/components/MyComponent.template")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/gu, componentName)
}

const parseContainer = (componentName) => {
	const filePath = pathModule.resolve("/", __dirname, "../patterns/my-component/components/MyComponentContainer.template")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/gu, componentName)
}

const parseIndex = (componentName) => {
	const filePath = pathModule.resolve("/", __dirname, "../patterns/my-component/index.template")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/gu, componentName)
}

const applyFlowOption = (dumbString, containerString, componentName) => {
	// MUSTACHE
	const flowContainerTags = {
		"flowComponentTyping": "<Props, State>",
		"flowDeclaration": "// @flow",
		"flowDefaultPropsStatic": "static defaultProps = {\n\n\t};",
		"flowPropsType": "type Props = {\n\n};",
		"flowStateType": "type State = {\n\tvalue1: string,\n};",
	}

	containerString = Mustache.render(containerString, flowContainerTags)

	// STRING-TEMPLATE
	const flowDumbTags = {
		"flowDeclaration": "// @flow",
		"flowDefaultPropsOut": `${componentName}.defaultProps = {\n\tvalue1: '',\n};`,
		"flowDumbComponentPropsTyping": ": Props",
		"flowPropsType": "type Props = {\n\tvalue1?: string,\n};",
	}

	dumbString = format(dumbString, flowDumbTags)

	return [
		dumbString,
		containerString,
	]
}

const dismissFlowOption = (dumbString, containerString) => {
	// MUSTACHE
	const flowContainerTags = {
		"flowComponentTyping": "",
		"flowDeclaration": "",
		"flowDefaultPropsStatic": "",
		"flowPropsType": "",
		"flowStateType": "",
	}

	containerString = Mustache.render(containerString, flowContainerTags)

	// STRING-TEMPLATE
	const flowDumbTags = {
		"flowDeclaration": "",
		"flowDefaultPropsOut": "",
		"flowDumbComponentPropsTyping": "",
		"flowPropsType": "",
	}

	dumbString = format(dumbString, flowDumbTags)

	// Remove empty lines
	containerString = containerString.replace(/^\s*[\r\n\n]/gmu, "\n")
	dumbString = dumbString.replace(/^\s*[\r\n\n]/gmu, "\n")

	return [
		dumbString,
		containerString,
	]
}


// REDUX
const reduxContainerFlags = {
	"redux-import-connect": "import { connect } from 'react-redux';",
	"redux-map-dispatch-to-props": "const mapDispatchToProps = dispatch => ({\n\t// action: (input) => dispatch(action(input)),\n});",
	"redux-map-state-to-props": "const mapStateToProps = () => ({}); // or (state) => ({});",
}

const applyReduxOption = (containerString, componentName) => {
	for (let key in reduxContainerFlags) {
		containerString = containerString.replace(new RegExp(`\\[\\[${key}\\]\\]`, "u"), reduxContainerFlags[key])
	}
	containerString = containerString.replace(new RegExp(`\\[\\[redux-connection\\]\\]${componentName}Container`, "u"), `connect(mapStateToProps, mapDispatchToProps)(${componentName}Container)`)

	return containerString
}

const dismissReduxOption = (containerString) => {
	for (let key in reduxContainerFlags) {
		containerString = containerString.replace(new RegExp(`\\[\\[${key}\\]\\]`, "u"), "").trim()
	}
	containerString = containerString.replace(new RegExp("\\[\\[redux-connection\\]\\]", "u"), "")

	// Remove empty lines
	containerString = containerString.replace(/^\s*[\r\n\n]/gmu, "\n")

	return containerString
}

const createComponent = (path, options) => {
	const folderName = getFolderName(path)
	const componentName = makeComponentName(folderName)

	const componentsPath = pathModule.resolve(path, "components")

	// MkdirSync recursive not working
	fs.mkdirSync(path)
	fs.mkdirSync(componentsPath)

	let dumbString = parseDumbComponent(componentName)
	let containerString = parseContainer(componentName)
	const indexString = parseIndex(componentName)

	if (options.flow) {
		[dumbString, containerString] = applyFlowOption(dumbString, containerString, componentName)
		console.log("Flow option activated !")
	} else {
		[dumbString, containerString] = dismissFlowOption(dumbString, containerString)
	}

	if (options.redux) {
		containerString = applyReduxOption(containerString, componentName)
		console.log("Redux option activated !")
	} else {
		containerString = dismissReduxOption(containerString)
	}

	if (options.scss) {
		dumbString = dumbString.replace(new RegExp(`./${componentName}.css`, "u"), `./${componentName}.scss`)
	}

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