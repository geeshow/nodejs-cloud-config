import { IRemoteFormatType } from "./types/YmlConfigFile";
export default function loadEnv(): Promise<import("./fetcher").IConfig | undefined>;
export declare function parseToMapData(formatName: IRemoteFormatType, remoteConfigFile: string): any;
declare function getCloudConfigFilenameByNodeEnv(): string;
declare function setEnvVariables(envVariables: any): void;
export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv };
