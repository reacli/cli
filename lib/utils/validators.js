import chalk from "chalk"

// Validate name
const validateName = (path) => {
	if (!path) {
		return false
	}

	console.log(chalk.black.bgCyan(`Valid name: ${path}`))

	return true
}

// Validate path
const validatePath = (path) => {
	if (!path) {
		return false
	}

	console.log(chalk.black.bgCyan(`Valid path: ${path}`))

	return true
}

// Validate the extension option
const validateExtension = (extension) => {
	if (extension !== "js" && extension !== "jsx") {
		console.log(chalk.black.bgRed(`Invalid extension '.${extension}'. Default one used ('.jsx')`))
		return false
	}

	return true
}

export { validateName, validatePath, validateExtension }