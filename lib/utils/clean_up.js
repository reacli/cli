
import "@babel/polyfill";

const cleanUp = (str) => {
	const cleanStr = str.replace(/^\s*[\r\n\n]/gmu, "\n")

	return cleanStr
}

export default cleanUp