const addReduxOption = (containerOptions, componentName) => {
	const reduxContainerFlags = {
		"exportedFilename": `connect(mapStateToProps, mapDispatchToProps)(${componentName}Container)`,
		"reduxImportConnect": "import { connect } from 'react-redux';",
		"reduxMapDispatchToProps": "const mapDispatchToProps = dispatch => ({\n\t// action: (input) => dispatch(action(input)),\n});",
		"reduxMapStateToProps": "const mapStateToProps = () => ({}); // or (state) => ({});",
	}

	containerOptions = Object.assign(containerOptions, reduxContainerFlags)

	return containerOptions
}

export { addReduxOption }