import {FetchEnvUrlParam, UrlFetcher} from "./index";

describe('url-fetcher', () => {
  it('should fetch env file from url', async () => {
    const param = {
      url: 'https://jsonplaceholder.typicode.com/todos/1'
    } as FetchEnvUrlParam;
    
    const urlFetcher = new UrlFetcher(param);
    const result = await urlFetcher.fetchEnvFile();
    expect(result.title).toBe('delectus aut autem');
  });
});
