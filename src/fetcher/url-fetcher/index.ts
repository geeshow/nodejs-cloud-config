import {Fetcher} from "../index";
import {getUrlContent} from "../../utils/url-reader";
import {parseKeyValueFormat} from "../../utils/parser";
import {YmlConfigFile} from "../../index";
import {FetchEnvGitParam} from "../git-fetcher";
import {FetchEnvSpringParam} from "../spring-fetcher";

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
