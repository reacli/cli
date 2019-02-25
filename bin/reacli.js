#! /usr/bin/env node

import pathModule from "path"
import program from "commander"
import pkgInfo from "pkginfo"
import inquirer from "inquirer";

import { validateName, validatePath } from "../lib/utils/validators"
import { createComponent } from "../lib/core"


const askQuestions = () => {
	const questions = [
		{
			choices: ["Component", "Hook"],
			message: "What would you like to create?",
			name: "TYPE",
			type: "list",
		},
		{
			message: "Enter the path where you would like your component to be created.",
			name: "PATH",
			type: "confirm",
			when: (answers) => answers.TYPE === "Component",
		},
	];

	return inquirer.prompt(questions);
};

const reactCli = async () => {

	pkgInfo(module, "version");
	const cliVersion = module.exports.version;

	// Define cli options
	program
		.version(cliVersion)
		.option("-f, --flow", "Add flow to the template")
		.option("--scss", "Use SCSS instead of classic css")
		.option("--redux", "Add Redux to the template")
		.parse(process.argv)

	const { args } = program;

	if (!args.length) {
		const answers = await askQuestions()
		console.log(answers)
	}

	const firstParam = args.shift()
	const secondParam = args.shift()

	let options = {}
	if (program.flow) {
		options = Object.assign(options, { flow: true })
	}
	if (program.scss) {
		options = Object.assign(options, { scss: true })
	}
	if (program.redux) {
		options = Object.assign(options, { redux: true })
	}

	// Cmd reacli component <path> creates a component architecture
	if (firstParam === "component") {
		const path = pathModule.resolve(secondParam)

		if (validatePath(path) && validateName(path)) {
			try {
				await createComponent(path, options)
			} catch (error) {
				console.log("ERROR: ", error)
				program.outputHelp()
			}
		}
	}
}

reactCli()

export default reactCli