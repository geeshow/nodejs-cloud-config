import {Fetcher} from "../index";

const { Octokit } = require("@octokit/rest");

export interface FetchEnvGitParam {
  token: string;
  owner: string;
  repo: string;
  path: string;
  branch: string;
}


export class GitFetcher implements Fetcher {
  private param: FetchEnvGitParam ;
  constructor(param: FetchEnvGitParam) {
    this.param = param;
  }
  async fetchEnvFile() {
    const octokit = new Octokit({ auth: this.param.token });
    const result = await octokit.repos.getContent({
      owner: this.param.owner,
      repo: this.param.repo,
      path: this.param.path,
      ref: this.param.branch,
    });
    
    return this.decodeContent(result.data.content);
  }
  
  decodeContent(content: string) {
    return Buffer.from(content, 'base64').toString('utf8');
  }
}

