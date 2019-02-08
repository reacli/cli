#! /usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
	var filePath = makePath("./patterns/my-component/components/MyComponent.jsx");
	var data = _fs2.default.readFileSync(filePath).toString();

	return data.replace(/MyComponent/g, componentName);
};

var parseContainer = function parseContainer(componentName) {
	var filePath = makePath("./patterns/my-component/components/MyComponentContainer.jsx");
	var data = _fs2.default.readFileSync(filePath).toString();

	return data.replace(/MyComponent/g, componentName);
};

var parseIndex = function parseIndex(componentName) {
	var filePath = makePath("./patterns/my-component/index.js");
	var data = _fs2.default.readFileSync(filePath).toString();

	return data.replace(/MyComponent/g, componentName);
};

var createComponent = function createComponent(path) {
	var folderName = getFolderName(path);
	var componentName = makeComponentName(folderName);

	var componentsPath = makePath(_path2.default.join(path, "components"));

	// MkdirSync recursive not working
	_fs2.default.mkdirSync(path);
	_fs2.default.mkdirSync(componentsPath);

	var dumbString = parseDumbComponent(componentName);
	var containerString = parseContainer(componentName);
	var indexString = parseIndex(componentName);

	createFiles(path, componentName, dumbString, containerString, indexString);
};

var reactCli = function reactCli(args) {
	var firstParam = args.shift();
	var secondParam = args.shift();

	// Cmd reacli component <path> creates a component architecture
	if (firstParam === "component") {
		var path = makePath(secondParam);

		if (validatePath(path) && validateName(path)) {
			try {
				createComponent(path);
			} catch (error) {
				console.log("ERROR: ", error);
			}
		}
	}
};

var args = process.argv.splice(2);
reactCli(args);

exports.default = reactCli;