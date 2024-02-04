"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileContent = void 0;
var fs_1 = __importDefault(require("fs"));
function getFileContent(path) {
    return fs_1.default.readFileSync(path).toString();
}
exports.getFileContent = getFileContent;
