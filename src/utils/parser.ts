import { parse } from 'dotenv';
import yaml from 'js-yaml';

function parseEnvFile(fileContent: string) {
  return parse(fileContent)
}


export interface YmlConfigFile {
  remote: {
    type: 'url' | 'git'
    param: {
      url: string
    } | {
      token: string
      owner: string
      repo: string
      path: string
    }
  }
}

function parseYmlFile(fileContent: string): YmlConfigFile {
  return yaml.load(fileContent) as YmlConfigFile
}

export { parseEnvFile, parseYmlFile }
