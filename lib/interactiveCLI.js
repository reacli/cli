
import inquirer from "inquirer"
import pathModule from "path"
import chalk from "chalk"


import { createComponent } from "../lib/core"

const askQuestions = () => {
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
					name: "flow",
				},
				{
					name: "redux",
				},
				{
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
	const answers = await askQuestions()

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