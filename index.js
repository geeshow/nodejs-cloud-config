"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypedConfig = exports.getCloudConfigFilenameByNodeEnv = exports.setEnvVariables = exports.loadEnv = void 0;
var parser_1 = require("./utils/parser");
var file_reader_1 = require("./utils/file-reader");
function loadEnv() {
    return __awaiter(this, void 0, void 0, function () {
        var cloudConfigFilename, cloudConfigFile, config, fetcher, envData, envVariables, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cloudConfigFilename = getCloudConfigFilenameByNodeEnv();
                    cloudConfigFile = (0, file_reader_1.getFileContent)("".concat(process.cwd(), "/").concat(cloudConfigFilename));
                    config = getTypedConfig(cloudConfigFile);
                    console.log('config', config);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    fetcher = require("./fetcher/".concat(config.type, "-fetcher"));
                    return [4 /*yield*/, fetcher.fetchEnvFile(config.param)];
                case 2:
                    envData = _a.sent();
                    console.log('envData', envData);
                    envVariables = (0, parser_1.parseEnvFile)(envData);
                    setEnvVariables(envVariables);
                    console.log("Successfully loaded env from ".concat(config.type, ":"), config.param);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching the env file: ".concat(error_1));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = loadEnv;
exports.loadEnv = loadEnv;
function getCloudConfigFilenameByNodeEnv() {
    var env = process.env.NODE_ENV ? ".".concat(process.env.NODE_ENV) : '';
    return ".cloud-config".concat(env, ".yml");
}
exports.getCloudConfigFilenameByNodeEnv = getCloudConfigFilenameByNodeEnv;
function getTypedConfig(cloudConfigFilePath) {
    var config = (0, parser_1.parseYmlFile)(cloudConfigFilePath);
    var type = config.remote.type.toLocaleLowerCase();
    var param = config.remote.param;
    return { type: type, param: param };
}
exports.getTypedConfig = getTypedConfig;
function setEnvVariables(envVariables) {
    for (var _i = 0, _a = Object.keys(envVariables); _i < _a.length; _i++) {
        var key = _a[_i];
        process.env[key] = envVariables[key];
    }
}
exports.setEnvVariables = setEnvVariables;
