import { Fetcher } from "../index";
export interface FetchEnvGitParam {
    token: string;
    owner: string;
    repo: string;
    path: string;
    branch: string;
}
export declare class GitFetcher implements Fetcher {
    private param;
    private readonly parser;
    private response;
    constructor(param: FetchEnvGitParam, parser: any);
    fetchConfigFromRemote(): Promise<void>;
    parseToMapData(): any;
    decodeContent(content: string): string;
}
