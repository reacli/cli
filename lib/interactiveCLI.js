
import inquirer from "inquirer"
import pathModule from "path"
import chalk from "chalk"

import { createComponent, createHook, loadOptionsInConfigFileIfExists } from "../lib/core"
import { validatePath, validateName } from "../lib/utils/validators"

const askQuestions = (options) => {
	const questions = [
		{
			choices: ["Component", "Hook"],
			message: "What would you like to create?",
			name: "type",
			type: "list",
		},
		{
			message: "Enter the component's path (components will take their name from the last folder of the path).",
			name: "path",
			type: "input",
			validate: (path) => {
				console.log()

				if (validatePath(path) && validateName(path)) {
					return true
				}

				return "You must enter a valid path."
			},
			when: (answers) => answers.type === "Component",
		},
		{
			choices: [
				{
					checked: options.flow,
					name: "flow",
				},
				{
					checked: options.redux,
					name: "redux",
				},
				{
					checked: options.scss,
					name: "scss",
				},
			],
			message: "Which options do you want to use in your component?",
			name: "options",
			type: "checkbox",
			when: (answers) => answers.type === "Component",
		},
		{
			message: "Enter the hook's path (it will take its name from the last folder of the path).",
			name: "path",
			type: "input",
			validate: (path) => {
				console.log()

				if (validatePath(path) && validateName(path)) {
					return true
				}

				return "You must enter a valid path."
			},
			when: (answers) => answers.type === "Hook",
		},
		{
			choices: [
				{
					checked: options.scss,
					name: "scss",
				},
			],
			message: "Which options do you want to use for your hook?",
			name: "options",
			type: "checkbox",
			when: (answers) => answers.type === "Hook",
		},
	];

	return inquirer.prompt(questions);
}

const interactiveCLI = async () => {
	let options = await loadOptionsInConfigFileIfExists(process.cwd())
	const answers = await askQuestions(options)

	options = answers.options.reduce((acc, opt) => {
		acc[opt] = true

		return acc
	}, {})

	const path = pathModule.resolve(answers.path)

	switch (answers.type) {
	case "Component":
		await createComponent(path, options)
		break
	case "Hook":
		await createHook(path, options)
		break
	default:
		console.log(chalk.black.bgRed("Type not known."))
		break
	}

	return options
}

export default interactiveCLI