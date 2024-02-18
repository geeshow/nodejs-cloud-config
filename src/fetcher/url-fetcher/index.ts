import {Fetcher} from "../index";
import {getUrlContent} from "../../utils/node/url-reader";

export interface FetchEnvUrlParam {
  url: string;
}

export class UrlFetcher implements Fetcher {
  private param: FetchEnvUrlParam;
  private readonly parser: any;
  private response: any;
  constructor(param: FetchEnvUrlParam, parser: any) {
    this.param = param;
    this.parser = parser;
  }

  async fetchConfigFromRemote() {
    this.response = await getUrlContent(this.param.url);
  }
  parseToMapData() {
    if (!this.response) {
      throw new Error('fetchConfigFromRemote should be called before parseToMapData');
    }
    return this.parser(this.response);
  }
}
