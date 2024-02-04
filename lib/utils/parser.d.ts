declare function parseEnvFile(fileContent: string): import("dotenv").DotenvParseOutput;
export interface YmlConfigFile {
    remote: {
        type: 'url' | 'git';
        param: {
            url: string;
        } | {
            token: string;
            owner: string;
            repo: string;
            path: string;
        };
    };
}
declare function parseYmlFile(fileContent: string): YmlConfigFile;
export { parseEnvFile, parseYmlFile };
