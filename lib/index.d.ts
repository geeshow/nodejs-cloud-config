import { IConfig } from "./fetcher";
export default class CloudConfig {
    static load(callback?: (arg: IConfig) => void): Promise<unknown>;
    static bind(envVariables: IConfig, target: any): void;
}
