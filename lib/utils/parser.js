"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseYmlFile = exports.parseEnvFile = void 0;
var dotenv_1 = require("dotenv");
var js_yaml_1 = __importDefault(require("js-yaml"));
function parseEnvFile(fileContent) {
    return (0, dotenv_1.parse)(fileContent);
}
exports.parseEnvFile = parseEnvFile;
function parseYmlFile(fileContent) {
    return js_yaml_1.default.load(fileContent);
}
exports.parseYmlFile = parseYmlFile;
