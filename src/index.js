import { fetchEnvFile } from './fetcher/url-fetcher.js';
import { parseEnvFile } from './parser/index.js';
import fs from 'fs';

async function loadEnv() {
  const config = getConfigData();
  const url = config['CLOUD.CONFIG.IMPORT.URL']
  if (url) {
    await loadEnvFromUrl(url);
  }
}

function getConfigData() {
  const env = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
  const basePath = process.cwd();
  const filename = `.cloudconfig${env}`;
  const envData = fs.readFileSync(`${basePath}/${filename}`).toString();
  // log to string
  console.log('read cloud config file: ', filename);
  return parseEnvFile(envData)
}

async function loadEnvFromUrl(url) {
  try {
    const envData = await fetchEnvFile(url);
    const envVariables = parseEnvFile(envData);
    setEnvVariables(envVariables);
    console.log('Successfully loaded env from URL: ', url);
  } catch (error) {
    console.error(`Error fetching the env file: ${error.message}`);
  }
}

function setEnvVariables(envVariables) {
  for (const key of Object.keys(envVariables)) {
    process.env[key] = envVariables[key];
  }
}

await loadEnv();
export { loadEnvFromUrl, setEnvVariables };

