import { parse } from 'dotenv';
import yaml from 'js-yaml';
import {FetchEnvSpringParam} from "../fetcher/spring-fetcher";
import {FetchEnvGitParam} from "../fetcher/git-fetcher";
import {FetchEnvUrlParam} from "../fetcher/url-fetcher";

function parseEnvFile(fileContent: string) {
  return parse(fileContent)
}


export interface YmlConfigFile {
  remote: {
    type: 'url' | 'git' | 'spring'
    param: FetchEnvUrlParam | FetchEnvGitParam | FetchEnvSpringParam
  }
}

function parseYmlFile(fileContent: string): YmlConfigFile {
  return yaml.load(fileContent) as YmlConfigFile
}

export { parseEnvFile, parseYmlFile }
