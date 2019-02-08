#! /usr/bin/env node

import fs from "fs"
import pathModule from "path"
import isWindows from "is-windows"

const validateName = (path) => {
	// Validate name
	return true
}

const validatePath = (path) => {
	// Validate path
	return true
}

const getFolderName = (path) => {
	if (isWindows()) {
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

const createFiles = (path, componentName, dumbString, containerString, indexString) => {
	const componentsPath = makePath(pathModule.join(path, "components"))
	const dumbComponentPath = makePath(pathModule.join(componentsPath, `${componentName}.jsx`))
	const containerPath = makePath(pathModule.join(componentsPath, `${componentName}Container.jsx`))
	const styleSheetPath = makePath(pathModule.join(componentsPath, `${componentName}.css`))
	const indexPath = makePath(pathModule.join(path, `index.js`))

	fs.writeFile(indexPath, indexString, "utf8", (err) => {
		if (err) throw err

		console.log("Index created !")
	});

	fs.writeFile(dumbComponentPath, dumbString, "utf8", (err) => {
		if (err) throw err

		console.log("Dumb component created !")
	});

	fs.writeFile(containerPath, containerString, "utf8", (err) => {
		if (err) throw err

		console.log("Container component created !")
	});

	fs.writeFile(styleSheetPath, "", "utf8", (err) => {
		if (err) throw err

		console.log("StyleSheet created !")
	});
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

const parseIndex = (componentName) => {
	const filePath = makePath("./patterns/my-component/index.js")
	const data = fs.readFileSync(filePath).toString()

	return data.replace(/MyComponent/g, componentName);
}

const createComponent = (path) => {
	const folderName = getFolderName(path)
	const componentName = makeComponentName(folderName)

	const componentsPath = makePath(pathModule.join(path, "components"))
	
	// mkdirSync recursive not working
	fs.mkdirSync(path)
	fs.mkdirSync(componentsPath)

	const dumbString = parseDumbComponent(componentName)
	const containerString = parseContainer(componentName)
	const indexString = parseIndex(componentName)

	createFiles(path, componentName, dumbString, containerString, indexString)
}

const makePath = (path) => {
	const realPath = pathModule.join(".", path)

	if (isWindows()) {
		return pathModule.win32.normalize(realPath)
	} else {
		return realPath
	}
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