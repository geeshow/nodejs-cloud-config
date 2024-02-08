import {parseEnvFile, parseYmlFile} from './utils/parser';
import {getFileContent} from './utils/file-reader';
import {createFetcher, Fetcher} from "./fetcher";
import {FetchEnvUrlParam, UrlFetcher} from "./fetcher/url-fetcher";

export default async function loadEnv() {
  const cloudConfigFilename = getCloudConfigFilenameByNodeEnv();
  const cloudConfigFilePath = getFileContent(`${process.cwd()}/${cloudConfigFilename}`);
  const config = parseYmlFile(cloudConfigFilePath);

  try {
    const fetcher: Fetcher = createFetcher(config);
    const envData = await fetcher.fetchEnvFile();
    const envVariables = parseEnvFile(envData);
    setEnvVariables(envVariables);

    console.log(`Successfully loaded env from ${config.remote.type}:`, config.remote.param);
  } catch (error) {
    console.error(`Error fetching the env file: ${error}`);
  }
}

function getCloudConfigFilenameByNodeEnv() {
  const env = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
  return `.cloud-config${env}.yml`;
}

function setEnvVariables(envVariables: any) {
  for (const key of Object.keys(envVariables)) {
    process.env[key] = envVariables[key];
  }
}

loadEnv();

export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv };
