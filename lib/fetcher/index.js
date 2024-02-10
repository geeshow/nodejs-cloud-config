"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParser = exports.createFetcher = void 0;
// Fetcher 인터페이스를 정의합니다.
var git_fetcher_1 = require("./git-fetcher");
var url_fetcher_1 = require("./url-fetcher");
var spring_fetcher_1 = require("./spring-fetcher");
var parser_1 = require("../utils/parser");
// Fetcher 구현체를 생성하는 팩토리 함수를 만듭니다.
function createFetcher(config) {
    var type = config.remote.type.toLocaleLowerCase();
    var param = config.remote.param;
    var parser = getParser(config.remote.format);
    switch (type) {
        case 'git':
            return new git_fetcher_1.GitFetcher(param, parser);
        case 'url':
            return new url_fetcher_1.UrlFetcher(param, parser);
        case 'spring':
            return new spring_fetcher_1.SpringFetcher(param, parser);
        default:
            throw new Error("Unsupported fetcher type: ".concat(type));
    }
}
exports.createFetcher = createFetcher;
/**
 * This function creates a parser function based on the format name.
 * @param formatName
 */
function getParser(formatName) {
    switch (formatName) {
        case 'json':
            return parser_1.parseJsonFormat;
        case 'yml':
            return parser_1.parseYmlFormat;
        case 'yaml':
            return parser_1.parseYmlFormat;
        case 'key=value':
            return parser_1.parseKeyValueFormat;
        case 'properties':
            return parser_1.parseKeyValueFormat;
        default:
            return parser_1.parseJsonFormat;
    }
}
exports.getParser = getParser;
