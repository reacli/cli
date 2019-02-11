#! /usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _isWindows = require("is-windows");

var _isWindows2 = _interopRequireDefault(_isWindows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Validate name
var validateName = function validateName(path) {
	console.log("Valid: " + path);

	return true;
};

// Validate path
var validatePath = function validatePath(path) {
	console.log("Valid: " + path);

	return true;
};

var getFolderName = function getFolderName(path) {
	if ((0, _isWindows2.default)()) {
		var _splitString = path.split("\\");

		return _splitString[_splitString.length - 1];
	}

	var splitString = path.split("/");

	return splitString[splitString.length - 1];
};

var makeComponentName = function makeComponentName(folderName) {
	return folderName.split("-").map(function (word) {
		return word[0].toUpperCase() + word.substr(1);
	}).join("");
};

var makePath = function makePath(path) {
	var realPath = _path2.default.join(".", path);

	if ((0, _isWindows2.default)()) {
		return _path2.default.win32.normalize(realPath);
	}

	return realPath;
};

var createFiles = function createFiles(path, componentName, dumbString, containerString, indexString) {
	var componentsPath = makePath(_path2.default.join(path, "components"));
	var dumbComponentPath = makePath(_path2.default.join(componentsPath, componentName + ".jsx"));
	var containerPath = makePath(_path2.default.join(componentsPath, componentName + "Container.jsx"));
	var styleSheetPath = makePath(_path2.default.join(componentsPath, componentName + ".css"));
	var indexPath = makePath(_path2.default.join(path, "index.js"));

	_fs2.default.writeFile(indexPath, indexString, "utf8", function (err) {
		if (err) {
			throw err;
		}

		console.log("Index created !");
	});

	_fs2.default.writeFile(dumbComponentPath, dumbString, "utf8", function (err) {
		if (err) {
			throw err;
		}

		console.log("Dumb component created !");
	});

	_fs2.default.writeFile(containerPath, containerString, "utf8", function (err) {
		if (err) {
			throw err;
		}

		console.log("Container component created !");
	});

	_fs2.default.writeFile(styleSheetPath, "", "utf8", function (err) {
		if (err) {
			throw err;
		}

		console.log("StyleSheet created !");
	});
};

var parseDumbComponent = function parseDumbComponent(componentName) {
	var filePath = makePath("./patterns/my-component/components/MyComponent.template");
	var data = _fs2.default.readFileSync(filePath).toString();

	return data.replace(/MyComponent/g, componentName);
};

var parseContainer = function parseContainer(componentName) {
	var filePath = makePath("./patterns/my-component/components/MyComponentContainer.template");
	var data = _fs2.default.readFileSync(filePath).toString();

	return data.replace(/MyComponent/g, componentName);
};

var parseIndex = function parseIndex(componentName) {
	var filePath = makePath("./patterns/my-component/index.js");
	var data = _fs2.default.readFileSync(filePath).toString();

	return data.replace(/MyComponent/g, componentName);
};

var applyFlowOption = function applyFlowOption(dumbString, containerString, componentName) {
	containerString = containerString.replace(/\[\[flow\x2Ddeclaration\]\]/g, '// @flow');
	containerString = containerString.replace(/\[\[flow\x2Dprops\x2Dtype\]\]/g, "type Props = {\n\n};");
	containerString = containerString.replace(/\[\[flow\x2Dstate\x2Dtype\]\]/g, "type State = {\n\tvalue1: string,\n};");
	containerString = containerString.replace(/\[\[flow\x2Dcomponent\x2Dtyping\]\]/g, "<Props, State>");
	containerString = containerString.replace(/\[\[flow\x2Ddefault\x2Dprops\x2Dstatic\]\]/g, "static defaultProps = {\n\n\t};");

	dumbString = dumbString.replace(/\[\[flow\x2Ddeclaration\]\]/g, '// @flow');
	dumbString = dumbString.replace(/\[\[flow\x2Dprops\x2Dtype\]\]/g, "type Props = {\n\tvalue1?: string,\n};");
	dumbString = dumbString.replace(/\[\[flow\x2Ddumb\x2Dcomponent\x2Dprops\x2Dtyping\]\]/g, ': Props');
	dumbString = dumbString.replace(/\[\[flow\x2Ddefault\x2Dprops\x2Dout\]\]/g, componentName + ".defaultProps = {\n\tvalue1: '',\n};");

	return [dumbString, containerString];
};

var dismissFlowOption = function dismissFlowOption(dumbString, containerString) {
	containerString = containerString.replace(/\[\[flow\x2Ddeclaration\]\]/g, '').trim();
	containerString = containerString.replace(/\[\[flow\x2Dprops\x2Dtype\]\]/g, '').trim();
	containerString = containerString.replace(/\[\[flow\x2Dstate\x2Dtype\]\]/g, '').trim();
	containerString = containerString.replace(/\[\[flow\x2Dcomponent\x2Dtyping\]\]/g, '');
	containerString = containerString.replace(/\[\[flow\x2Ddefault\x2Dprops\x2Dstatic\]\]/g, '').trim();
	containerString = containerString.replace(/^\s*[\r\n\n]/gm, '\n');

	dumbString = dumbString.replace(/\[\[flow\x2Ddeclaration\]\]/g, '').trim();
	dumbString = dumbString.replace(/\[\[flow\x2Dprops\x2Dtype\]\]/g, '').trim();
	dumbString = dumbString.replace(/\[\[flow\x2Ddumb\x2Dcomponent\x2Dprops\x2Dtyping\]\]/g, '');
	dumbString = dumbString.replace(/\[\[flow\x2Ddefault\x2Dprops\x2Dout\]\]/g, '').trim();
	dumbString = dumbString.replace(/^\s*[\r\n\n]/gm, '\n');

	return [dumbString, containerString];
};

var createComponent = function createComponent(path, options) {
	var folderName = getFolderName(path);
	var componentName = makeComponentName(folderName);

	var componentsPath = makePath(_path2.default.join(path, "components"));

	// MkdirSync recursive not working
	_fs2.default.mkdirSync(path);
	_fs2.default.mkdirSync(componentsPath);

	var dumbString = parseDumbComponent(componentName);
	var containerString = parseContainer(componentName);
	var indexString = parseIndex(componentName);

	if (options.flow) {
		var _applyFlowOption = applyFlowOption(dumbString, containerString, componentName);

		var _applyFlowOption2 = _slicedToArray(_applyFlowOption, 2);

		dumbString = _applyFlowOption2[0];
		containerString = _applyFlowOption2[1];
	} else {
		var _dismissFlowOption = dismissFlowOption(dumbString, containerString);

		var _dismissFlowOption2 = _slicedToArray(_dismissFlowOption, 2);

		dumbString = _dismissFlowOption2[0];
		containerString = _dismissFlowOption2[1];
	}

	createFiles(path, componentName, dumbString, containerString, indexString);
};

var reactCli = function reactCli(args) {
	var firstParam = args.shift();
	var secondParam = args.shift();

	var options = {};
	var useFlow = /--flow|-f/.test(args);

	if (useFlow) {
		options = Object.assign(options, { flow: true });
	}

	// Cmd reacli component <path> creates a component architecture
	if (firstParam === "component") {
		var path = makePath(secondParam);

		if (validatePath(path) && validateName(path)) {
			try {
				createComponent(path, options);
			} catch (error) {
				console.log("ERROR: ", error);
			}
		}
	}
};

var args = process.argv.splice(2);
reactCli(args);

exports.default = reactCli;