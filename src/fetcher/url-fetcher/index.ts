import {Fetcher} from "../index";
import {getUrlContent} from "../../utils/url-reader";
import {parseEnvFile} from "../../utils/parser";

export interface FetchEnvUrlParam {
  url: string;
}

export class UrlFetcher implements Fetcher {
  private param: FetchEnvUrlParam;
  constructor(param: FetchEnvUrlParam) {
    this.param = param
  }
  async fetchEnvFile() {
    const envData = await getUrlContent(this.param.url);
    if (envData.startsWith('{') || envData.startsWith('[')) {
      return JSON.parse(envData);
    } else {
      return parseEnvFile(envData);
    }
  }
}
