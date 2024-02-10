"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlContent = void 0;
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
function getUrlContent(url) {
    return new Promise(function (resolve, reject) {
        var lib = url.startsWith('https') ? https_1.default : http_1.default;
        var request = lib.get(url, function (response) {
            if (response.statusCode && (response.statusCode < 200 || response.statusCode > 299)) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            var body = [];
            response.on('data', function (chunk) { return body.push(chunk); });
            response.on('end', function () { return resolve(body.join('')); });
        });
        request.on('error', function (err) {
            console.log('Error: ', err.message);
            reject(err);
        });
    });
}
exports.getUrlContent = getUrlContent;
