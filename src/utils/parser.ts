import { parse } from 'dotenv';
import yaml from 'js-yaml';

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
