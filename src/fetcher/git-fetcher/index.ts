import {Fetcher} from "../index";
import {getUrlContent} from "../../utils/node/url-reader";

export interface FetchEnvGitParam {
  token: string;
  owner: string;
  repo: string;
  path: string;
  branch: string;
}


export class GitFetcher implements Fetcher {
  private param: FetchEnvGitParam;
  private readonly parser: any;
  private response: any;
  constructor(param: FetchEnvGitParam, parser: any) {
    this.param = param;
    this.parser = parser;
  }
  async fetchConfigFromRemote() {
    const owner = this.param.owner;
    const repo = this.param.repo;
    const path = this.param.path;
    const branch = this.param.branch ? `?ref=${this.param.branch}` : '';
    const token = this.param.token;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}${branch}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'NodejsCloudConfigModule'
    }
    const response = await getUrlContent(url, headers);
    this.response = JSON.parse(response);
  }
  
  parseToMapData() {
    if (!this.response) {
      throw new Error('fetchConfigFromRemote should be called before parseToMapData');
    }
    const envData = this.decodeContent(this.response.content);
    return this.parser(envData);
  }
  
  decodeContent(content: string) {
    return Buffer.from(content, 'base64').toString('utf8');
  }
}

