#! /usr/bin/env node

import fs from 'fs'

const validateName = (path) => {
	// Validate name
	return true
}

const validatePath = (path) => {
	// Validate path
	return true
}

const getFolderName = (path) => {
	const splitString = path.split("/")

	return splitString[splitString.length - 1]
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
	
	console.log("folder name: ", folderName);
	console.log("component name: ", componentName);
}

const makePath = (path) => {
	// Make path here
	return path
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