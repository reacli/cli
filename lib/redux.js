
import "@babel/polyfill";

const addReduxOption = (containerTags, componentName) => {
	const reduxContainerTags = {
		"exportedFilename": `connect(mapStateToProps, mapDispatchToProps)(${componentName}Container)`,
		"reduxImportConnect": "import { connect } from 'react-redux';",
		"reduxMapDispatchToProps": "const mapDispatchToProps = dispatch => ({\n\t// action: (input) => dispatch(action(input)),\n});",
		"reduxMapStateToProps": "const mapStateToProps = () => ({}); // or (state) => ({});",
	}

	containerTags = Object.assign(containerTags, reduxContainerTags)

	return containerTags
}

export { addReduxOption }