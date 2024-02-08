import fetch from 'isomorphic-fetch';
import {Fetcher} from "../index";


export class UrlFetcher implements Fetcher {
  async fetchEnvFile(param: { url: string }) {
    const response = await fetch(param.url);
    return await response.text();
  }
}
