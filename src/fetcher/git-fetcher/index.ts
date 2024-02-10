import {Fetcher} from "../index";
import {parseKeyValueFormat} from "../../utils/parser";
import {Octokit} from "@octokit/rest";
import {YmlConfigFile} from "../../index";

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
    const octokit = new Octokit({ auth: this.param.token });
    this.response = await octokit.repos.getContent({
      owner: this.param.owner,
      repo: this.param.repo,
      path: this.param.path,
      ref: this.param.branch,
    });
  }
  
  parseToMapData() {
    if (!this.response) {
      throw new Error('fetchConfigFromRemote should be called before parseToMapData');
    }
    const envData = this.decodeContent(this.response.data.content);
    return this.parser(envData);
  }
  
  decodeContent(content: string) {
    return Buffer.from(content, 'base64').toString('utf8');
  }
}

