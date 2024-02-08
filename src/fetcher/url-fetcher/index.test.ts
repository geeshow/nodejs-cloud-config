import {FetchEnvGitParam, GitFetcher} from "../git-fetcher";
import {FetchEnvUrlParam, UrlFetcher} from "./index";

describe('url-fetcher', () => {
  it('should fetch env file from url', async () => {
    const param = {
      url: 'https://jsonplaceholder.typicode.com/todos/1'
    } as FetchEnvUrlParam;
    
    const urlFetcher = new UrlFetcher(param);
    const result = JSON.parse(await urlFetcher.fetchEnvFile());
    console.log('result', result);
    expect(result).toStrictEqual({ userId: 1, id: 1, title: 'delectus aut autem', completed: false });
  });
});
