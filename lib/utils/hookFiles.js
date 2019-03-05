
import "@babel/polyfill";

import pathModule from "path"
import fs from "fs"

const createHookFiles = ({ path, hookName, dumbString, indexString, options }) => {
	const hookFileExtension = options.extension ? options.extension : "jsx"
	const hooksPath = pathModule.resolve(path, "hooks")
	const hookPath = pathModule.resolve(hooksPath, `${hookName}.${hookFileExtension}`)
	const styleSheetPath = pathModule.resolve(hooksPath, options.scss ? `${hookName}.scss` : `${hookName}.css`)
	const indexPath = pathModule.resolve(path, "index.js")

	fs.writeFile(indexPath, indexString, "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log("Index created !")
	})

	fs.writeFile(hookPath, dumbString, "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log("Hook created !")
	})

	fs.writeFile(styleSheetPath, "", "utf8", (err) => {
		if (err) {
			throw err
		}

		console.log("StyleSheet created !")
	})
}

const prepareHookFiles = (hookName) => {
	const hookPath = pathModule.resolve("/", __dirname, "../../patterns/my-hook/hooks/MyHook.template")
	const indexPath = pathModule.resolve("/", __dirname, "../../patterns/my-hook/index.template")

	const hookString = fs.readFileSync(hookPath).toString()
	const indexString = fs.readFileSync(indexPath).toString()

	return [
		hookString,
		indexString,
	].map((str) => str.replace(/MyHook/gu, hookName))
}

export { createHookFiles, prepareHookFiles }