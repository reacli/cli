
import inquirer from "inquirer"
import pathModule from "path"
import chalk from "chalk"


import { createComponent, loadOptionsInConfigFileIfExists } from "../lib/core"

const askQuestions = (options) => {
	const questions = [
		{
			choices: ["Component", "Hook"],
			message: "What would you like to create?",
			name: "type",
			type: "list",
		},
		{
			message: "Enter the path where you would like your component to be created.",
			name: "path",
			type: "input",
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
	];

	return inquirer.prompt(questions);
}

const interactiveCLI = async (options) => {
	options = await loadOptionsInConfigFileIfExists(process.cwd(), options)
	const answers = await askQuestions(options)

	if (answers.type === "Component") {
		options = answers.options.reduce((acc, opt) => {
			acc[opt] = true

			return acc
		}, {})
	}

	// Create the component
	await createComponent(pathModule.resolve(answers.path), options)

	if (answers.type === "Hook") {
		console.log(chalk.black.bgRed("Not implemented yet."))
	}

	return options
}

export { interactiveCLI }