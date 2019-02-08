#! /usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO: Change this
var isWindows = true;

var validateName = function validateName(path) {
	// Validate name
	return true;
};

var validatePath = function validatePath(path) {
	// Validate path
	return true;
};

var getFolderName = function getFolderName(path) {
	if (isWindows) {
		var splitString = path.split("\\");

		return splitString[splitString.length - 1];
	} else {
		var _splitString = path.split("/");

		return _splitString[_splitString.length - 1];
	}
};

var makeComponentName = function makeComponentName(folderName) {
	return folderName.split("-").map(function (word) {
		return word[0].toUpperCase() + word.substr(1);
	}).join("");
};

var createFiles = function createFiles(dumbString, containerString) {
	// This should create files
	console.log("creating files...");
};

var createComponent = function createComponent(path) {
	var folderName = getFolderName(path);
	var componentName = makeComponentName(folderName);

	_fs2.default.mkdirSync(path);
	var dumbString = parseDumbComponent(componentName);
	var containerString = parseContainer(componentName);

	createFiles(dumbString, containerString);
};

var makePath = function makePath(path) {
	var realPath = _path2.default.join(".", path);

	if (isWindows) {
		return _path2.default.win32.normalize(realPath);
	} else {
		return realPath;
	}
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

var reactCli = function reactCli(args) {
	var firstParam = args.shift();
	var secondParam = args.shift();

	// TO create a component:
	// recli component <path>
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