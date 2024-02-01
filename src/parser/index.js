import { parse } from 'dotenv';
function parseEnvFile(fileContent) {
  return parse(fileContent)
}

export { parseEnvFile }
