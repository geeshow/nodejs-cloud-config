import { FetchEnvUrlParam } from "./fetcher/url-fetcher";
import { FetchEnvGitParam } from "./fetcher/git-fetcher";
import { FetchEnvSpringParam } from "./fetcher/spring-fetcher";
export type IRemoteType = 'url' | 'git' | 'spring';
export type IRemoteFormatType = 'json' | 'yml' | 'yaml' | 'properties' | 'key=value';
export interface YmlConfigFile {
    remote: {
        type: IRemoteType;
        format: IRemoteFormatType;
        param: FetchEnvUrlParam | FetchEnvGitParam | FetchEnvSpringParam;
    };
}
export default function loadEnv(): Promise<void>;
export declare function parseToMapData(formatName: IRemoteFormatType, remoteConfigFile: string): any;
declare function getCloudConfigFilenameByNodeEnv(): string;
declare function setEnvVariables(envVariables: any): void;
export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv };
