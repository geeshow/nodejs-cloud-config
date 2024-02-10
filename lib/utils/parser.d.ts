declare function parseKeyValueFormat(fileContent: string): import("dotenv").DotenvParseOutput;
declare function parseYmlFormat(fileContent: string): unknown;
declare function parseJsonFormat(fileContent: string): any;
export { parseKeyValueFormat, parseYmlFormat, parseJsonFormat };
