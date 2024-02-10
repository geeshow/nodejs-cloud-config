import { Fetcher, IEnv } from "../index";
export interface FetchEnvSpringParam {
    serverUrl: string;
    applicationName: string;
    profile: string;
    label?: string;
}
export declare class SpringFetcher implements Fetcher {
    private param;
    private readonly parser;
    private response;
    constructor(param: FetchEnvSpringParam, parser: any);
    fetchConfigFromRemote(): Promise<void>;
    parseToMapData(): IEnv;
}
