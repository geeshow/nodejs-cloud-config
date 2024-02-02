"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEnvFile = parseEnvFile;
var _dotenv = require("dotenv");
function parseEnvFile(fileContent) {
  return (0, _dotenv.parse)(fileContent);
}