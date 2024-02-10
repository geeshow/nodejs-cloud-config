import { parse } from 'dotenv';
import yaml from 'js-yaml';
import {FetchEnvSpringParam} from "../fetcher/spring-fetcher";
import {FetchEnvGitParam} from "../fetcher/git-fetcher";
import {FetchEnvUrlParam} from "../fetcher/url-fetcher";

function parseKeyValueFormat(fileContent: string) {
  return parse(fileContent);
}

function parseYmlFormat(fileContent: string) {
  return yaml.load(fileContent);
}

function parseJsonFormat(fileContent: string) {
  return JSON.parse(fileContent);
}

export { parseKeyValueFormat, parseYmlFormat, parseJsonFormat }
