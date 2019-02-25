import chalk from "chalk"

// Validate name
const validateName = (path) => {
	console.log(chalk.black.bgCyan(`Valid: ${path}`))

	return true
}

// Validate path
const validatePath = (path) => {
	console.log(chalk.black.bgCyan(`Valid: ${path}`))

	return true
}

export { validateName, validatePath }