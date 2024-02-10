// Fetcher 인터페이스를 정의합니다.
import {FetchEnvGitParam, GitFetcher} from "./git-fetcher";
import {FetchEnvUrlParam, UrlFetcher} from "./url-fetcher";
import {FetchEnvSpringParam, SpringFetcher} from "./spring-fetcher";
import {IRemoteFormatType, YmlConfigFile} from "../index";
import {parseJsonFormat, parseKeyValueFormat, parseYmlFormat} from "../utils/parser";
import yaml from "js-yaml";
export interface IEnv {
  [name: string]: string;
}
export interface Fetcher {
  fetchConfigFromRemote(): void;
  parseToMapData(): IEnv;
}

// Fetcher 구현체를 생성하는 팩토리 함수를 만듭니다.
export function createFetcher(config: YmlConfigFile): Fetcher {
  const type = config.remote.type.toLocaleLowerCase();
  const param = config.remote.param
  const parser = getParser(config.remote.format);
  switch (type) {
    case 'git':
      return new GitFetcher(param as FetchEnvGitParam, parser);
    case 'url':
      return new UrlFetcher(param as FetchEnvUrlParam, parser);
    case 'spring':
      return new SpringFetcher(param as FetchEnvSpringParam, parser);
    default:
      throw new Error(`Unsupported fetcher type: ${type}`);
  }
}

/**
 * This function creates a parser function based on the format name.
 * @param formatName
 */
export function getParser(formatName: IRemoteFormatType): Function {
  switch (formatName) {
    case 'json':
      return parseJsonFormat;
    case 'yml':
      return parseYmlFormat;
    case 'yaml':
      return parseYmlFormat;
  case 'key=value':
      return parseKeyValueFormat;
  case 'properties':
      return parseKeyValueFormat;
  default:
    return parseJsonFormat;
  }
}

