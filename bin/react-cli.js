#! /usr/bin/env node

import fs from 'fs'
import pathModule from "path"

// @TODO: Change this
const isWindows = true

const validateName = (path) => {
	// Validate name
	return true
}

const validatePath = (path) => {
	// Validate path
	return true
}

const getFolderName = (path) => {
	if (isWindows) {
		const splitString = path.split("\\")

		return splitString[splitString.length - 1]
	} else {
		const splitString = path.split("/")

		return splitString[splitString.length - 1]
	}
}

const makeComponentName = (folderName) => {
	return folderName
		.split("-")
		.map(word => word[0].toUpperCase() + word.substr(1))
		.join("")
}

const createComponent = (path) => {
	const folderName = getFolderName(path)
	const componentName = makeComponentName(folderName)

	fs.mkdirSync(path)
	const dumbString = parseDumbComponent(componentName)
	const containerString = parseContainer(componentName)

	console.log(containerString)
}

const makePath = (path) => {
	const realPath = pathModule.join(".", path);

	if (isWindows) {
		return pathModule.win32.normalize(realPath);
	} else {
		return realPath
	}
}

const parseDumbComponent = (componentName) => {
	const filePath = makePath("./patterns/my-component/components/MyComponent.jsx")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/g, componentName);
}

const parseContainer = (componentName) => {
	const filePath = makePath("./patterns/my-component/components/MyComponentContainer.jsx")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/g, componentName);
} 

const reactCli = (args) => {
	const firstParam = args.shift()
  const secondParam = args.shift()

  	// TO create a component:
  	// recli component <path>
	if (firstParam === "component") {
		const path = makePath(secondParam)

		if (validatePath(path) && validateName(path)) {
			try {
				createComponent(path)
			} catch (error) {
				console.log("ERROR: ", error)
			}
		}
	}
}

const args = process.argv.splice(2)
reactCli(args)

export default reactCli