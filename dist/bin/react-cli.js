#! /usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var reactCli = function reactCli(args) {
  var firstParam = args.shift();
  var secondParam = args.shift();

  // TO create a component:
  // recli component <path>

  console.log("first: ", firstParam);
  console.log("second: ", secondParam);
};

var args = process.argv.splice(2);
reactCli(args);

exports.default = reactCli;