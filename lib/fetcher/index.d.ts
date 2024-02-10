import { IRemoteFormatType, YmlConfigFile } from "../types/YmlConfigFile";
export interface IConfig {
    [name: string]: string;
}
export interface Fetcher {
    fetchConfigFromRemote(): void;
    parseToMapData(): IConfig;
}
export declare function createFetcher(config: YmlConfigFile): Fetcher;
/**
 * This function creates a parser function based on the format name.
 * @param formatName
 */
export declare function getParser(formatName: IRemoteFormatType): Function;
