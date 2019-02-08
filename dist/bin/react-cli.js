#! /usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateName = function validateName(path) {
	// Validate name
	return true;
};

var validatePath = function validatePath(path) {
	// Validate path
	return true;
};

var getFolderName = function getFolderName(path) {
	var splitString = path.split("/");

	return splitString[splitString.length - 1];
};

var makeComponentName = function makeComponentName(folderName) {
	// const name = folderName.replace(/(\-\w)/g, (word) => word[1].toUpperCase());
	var name = folderName.split("-").map(function (word) {
		return word[0].toUpperCase() + word.substr(1);
	}).join("");

	return name;
};

var createComponent = function createComponent(path) {
	var folderName = getFolderName(path);
	var componentName = makeComponentName(folderName);

	console.log("folder name: ", folderName);
	console.log("component name: ", componentName);
};

var makePath = function makePath(path) {
	// Make path here
	return path;
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