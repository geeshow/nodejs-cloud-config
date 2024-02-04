export interface FetchEnvFileParam {
    token: string;
    owner: string;
    repo: string;
    path: string;
}
export declare function fetchEnvFile(param: FetchEnvFileParam): Promise<string | undefined>;
