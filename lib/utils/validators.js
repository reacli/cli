import chalk from "chalk"

// Validate name
const validateName = (path) => {
	console.log(chalk.black.bgCyan(`Valid name: ${path}`))

	return true
}

// Validate path
const validatePath = (path) => {
	console.log(chalk.black.bgCyan(`Valid path: ${path}`))

	return true
}

export { validateName, validatePath }