// Fetcher 인터페이스를 정의합니다.
import {FetchEnvGitParam, GitFetcher} from "./git-fetcher";
import {FetchEnvUrlParam, UrlFetcher} from "./url-fetcher";
import {YmlConfigFile} from "../utils/parser";

export interface Fetcher {
  fetchEnvFile(): Promise<string>;
}

// Fetcher 구현체를 생성하는 팩토리 함수를 만듭니다.
export function createFetcher(config: YmlConfigFile): Fetcher {
  const type = config.remote.type.toLocaleLowerCase();
  const param = config.remote.param
  switch (type) {
    case 'git':
      return new GitFetcher(param as FetchEnvGitParam);
    case 'url':
      return new UrlFetcher(param as FetchEnvUrlParam);
    default:
      throw new Error(`Unsupported fetcher type: ${type}`);
  }
}
