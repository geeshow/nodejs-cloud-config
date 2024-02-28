import {Fetcher} from "../index";
import { exec } from 'child_process';
import {execSync} from "node:child_process";


export interface FetchEnvGitCliParam {
  owner: string;
  repo: string;
  path: string;
  branch: string;
}


export class GitCliFetcher implements Fetcher {
  private param: FetchEnvGitCliParam;
  private readonly parser: any;
  private response: any;
  constructor(param: FetchEnvGitCliParam, parser: any) {
    this.param = param;
    this.parser = parser;
  }
  async fetchConfigFromRemote() {
    const owner = this.param.owner;
    const repo = this.param.repo;
    const path = this.param.path;
    const branch = this.param.branch ? `?ref=${this.param.branch}` : '';
    
    const cliCommand: string = `gh api \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    /repos/${owner}/${repo}/contents/${path}
    `;
    try {
      // 명령 실행
      const output: Buffer = execSync(cliCommand);
      
      // 결과 출력
      this.response = JSON.parse(output.toString());
    } catch (error) {
      // 에러 처리
      console.error(`Error: ${error}`);
    }
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

