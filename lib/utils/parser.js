"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonFormat = exports.parseYmlFormat = exports.parseKeyValueFormat = void 0;
var dotenv_1 = require("dotenv");
var js_yaml_1 = __importDefault(require("js-yaml"));
function parseKeyValueFormat(fileContent) {
    return (0, dotenv_1.parse)(fileContent);
}
exports.parseKeyValueFormat = parseKeyValueFormat;
function parseYmlFormat(fileContent) {
    return js_yaml_1.default.load(fileContent);
}
exports.parseYmlFormat = parseYmlFormat;
function parseJsonFormat(fileContent) {
    return JSON.parse(fileContent);
}
exports.parseJsonFormat = parseJsonFormat;
