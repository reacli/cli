
const addFlowOption = (dumbOptions, containerOptions, componentName) => {
	const flowContainerTags = {
		"flowComponentTyping": "<Props, State>",
		"flowDeclaration": "// @flow",
		"flowDefaultPropsStatic": "static defaultProps = {\n\n\t};",
		"flowPropsType": "type Props = {\n\n};",
		"flowStateType": "type State = {\n\tvalue1: string,\n};",
	}

	const flowDumbTags = {
		"flowDeclaration": "// @flow",
		"flowDefaultPropsOut": `${componentName}.defaultProps = {\n\tvalue1: '',\n};`,
		"flowDumbComponentPropsTyping": ": Props",
		"flowPropsType": "type Props = {\n\tvalue1?: string,\n};",
	}

	dumbOptions = Object.assign(dumbOptions, flowDumbTags)
	containerOptions = Object.assign(containerOptions, flowContainerTags)

	return [
		dumbOptions,
		containerOptions,
	]
}

export { addFlowOption }