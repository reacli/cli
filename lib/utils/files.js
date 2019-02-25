
import isWindows from "is-windows"
import pathModule from "path"
import fs from "fs"
import chalk from "chalk"

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

		console.log(chalk.green("Index created !"))
	})

	fs.writeFile(dumbComponentPath, dumbString, "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log(chalk.green("Dumb component created !"))
	})

	fs.writeFile(containerPath, containerString, "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log(chalk.green("Container component created !"))
	})

	fs.writeFile(styleSheetPath, "", "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log(chalk.green("StyleSheet created !"))
	})
}

const prepareFiles = (componentName) => {
	const dumbPath = pathModule.resolve("/", __dirname, "../../patterns/my-component/components/MyComponent.template")
	const containerPath = pathModule.resolve("/", __dirname, "../../patterns/my-component/components/MyComponentContainer.template")
	const indexPath = pathModule.resolve("/", __dirname, "../../patterns/my-component/index.template")

	const dumbString = fs.readFileSync(dumbPath).toString()
	const containerString = fs.readFileSync(containerPath).toString()
	const indexString = fs.readFileSync(indexPath).toString()

	return [
		dumbString,
		containerString,
		indexString,
	].map((str) => str.replace(/MyComponent/gu, componentName))
}

export { getFolderName, makeComponentName, createFiles, prepareFiles }