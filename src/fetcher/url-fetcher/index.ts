import {Fetcher} from "../index";
import {getUrlContent} from "../../utils/url-reader";

export interface FetchEnvUrlParam {
  url: string;
}

export class UrlFetcher implements Fetcher {
  private param: FetchEnvUrlParam;
  constructor(param: FetchEnvUrlParam) {
    this.param = param
  }
  async fetchEnvFile() {
    const response = await getUrlContent(this.param.url);
    return response;
  }
}
