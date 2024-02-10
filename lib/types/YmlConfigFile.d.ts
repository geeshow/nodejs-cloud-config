import { FetchEnvUrlParam } from "../fetcher/url-fetcher";
import { FetchEnvGitParam } from "../fetcher/git-fetcher";
import { FetchEnvSpringParam } from "../fetcher/spring-fetcher";
export type IRemoteType = 'url' | 'git' | 'spring';
export type IRemoteFormatType = 'json' | 'yml' | 'yaml' | 'env' | 'key=value';
export interface YmlConfigFile {
    remote: {
        type: IRemoteType;
        format: IRemoteFormatType;
        param: FetchEnvUrlParam | FetchEnvGitParam | FetchEnvSpringParam;
        debug: boolean;
    };
}
