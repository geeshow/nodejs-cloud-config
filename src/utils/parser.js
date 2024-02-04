import { parse } from 'dotenv';
import yaml from 'js-yaml';

function parseEnvFile(fileContent) {
  return parse(fileContent)
}
function parseYmlFile(fileContent) {
  return yaml.load(fileContent)
}

export { parseEnvFile, parseYmlFile }
