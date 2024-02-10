import { Fetcher } from "../index";
export interface FetchEnvUrlParam {
    url: string;
}
export declare class UrlFetcher implements Fetcher {
    private param;
    private readonly parser;
    private response;
    constructor(param: FetchEnvUrlParam, parser: any);
    fetchConfigFromRemote(): Promise<void>;
    parseToMapData(): any;
}
