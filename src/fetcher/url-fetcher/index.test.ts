import {FetchEnvUrlParam, UrlFetcher} from "./index";
import {parseJsonFormat} from "../../utils/parser";

describe('url-fetcher', () => {
  it('should fetch env file from url', async () => {
    const parser = parseJsonFormat
    const param = {
      url: 'https://jsonplaceholder.typicode.com/todos/1'
    } as FetchEnvUrlParam;
    
    const urlFetcher = new UrlFetcher(param, parser);
    await urlFetcher.fetchConfigFromRemote();
    const result = urlFetcher.parseToMapData();
    expect(result.title).toBe('delectus aut autem');
  });
});
