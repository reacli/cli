#! /usr/bin/env node

const reactCli = (args) => {
	const firstParam = args.shift()
  	const secondParam = args.shift()

  	// TO create a component:
  	// recli component <path>

  	console.log("first: ", firstParam)
  	console.log("second: ", secondParam)
}

const args = process.argv.splice(2)
reactCli(args)

export default reactCli