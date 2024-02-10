// Fetcher 인터페이스를 정의합니다.
import {FetchEnvGitParam, GitFetcher} from "./git-fetcher";
import {FetchEnvUrlParam, UrlFetcher} from "./url-fetcher";
import {YmlConfigFile} from "../utils/parser";
import {FetchEnvSpringParam, SpringFetcher} from "./spring-fetcher";
export interface IEnv {
  [name: string]: string;
}
export interface Fetcher {
  fetchEnvFile(): Promise<IEnv>;
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
    case 'spring':
      return new SpringFetcher(param as FetchEnvSpringParam);
    default:
      throw new Error(`Unsupported fetcher type: ${type}`);
  }
}
