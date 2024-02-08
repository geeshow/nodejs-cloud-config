// Fetcher 인터페이스를 정의합니다.
import {GitFetcher} from "./git-fetcher";
import {UrlFetcher} from "./url-fetcher";

export interface Fetcher {
  fetchEnvFile(param: any): Promise<string>;
}

// Fetcher 구현체를 생성하는 팩토리 함수를 만듭니다.
export function createFetcher(type: string): Fetcher {
  switch (type) {
    case 'git':
      return new GitFetcher();
    case 'url':
      return new UrlFetcher();
    default:
      throw new Error(`Unsupported fetcher type: ${type}`);
  }
}
