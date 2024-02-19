import {parseJsonFormat, parseKeyValueFormat, parseYmlFormat} from './utils/parser';
import {getFileContent} from './utils/file-reader';
import {createFetcher, Fetcher} from "./fetcher";
import {IRemoteFormatType, YmlConfigFile} from "./types/YmlConfigFile";


export default async function loadEnv() {
  console.log('Loading env from remote...');
  const cloudConfigFilename = getCloudConfigFilenameByNodeEnv();
  const cloudConfigFilePath = getFileContent(`${process.cwd()}/${cloudConfigFilename}`);
  const config = parseYmlFormat(cloudConfigFilePath) as YmlConfigFile;
  
  try {
    const fetcher: Fetcher = createFetcher(config);
    await fetcher.fetchConfigFromRemote();
    const envVariables = fetcher.parseToMapData();
    if (config.remote.debug) {
      console.log('Fetched env:', envVariables)
    }
    
    console.log(`Successfully loaded env from ${config.remote.type}:`, config.remote.param);
    return envVariables;
  } catch (error) {
    console.error(`Error fetching the env file: ${error}`);
  }
}

export function parseToMapData(formatName: IRemoteFormatType, remoteConfigFile: string) {
  switch (formatName) {
    case 'json':
      return parseJsonFormat(remoteConfigFile);
    case 'yml':
      return parseYmlFormat(remoteConfigFile);
    case 'yaml':
      return parseYmlFormat(remoteConfigFile);
    case 'key=value':
      return parseKeyValueFormat(remoteConfigFile);
    case 'env':
      return parseKeyValueFormat(remoteConfigFile);
    default:
      return remoteConfigFile
  }
}

function getCloudConfigFilenameByNodeEnv() {
  const env = process.env.CLOUD_CONFIG_ENV
      ? `.${process.env.CLOUD_CONFIG_ENV}`
      : process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
  return `.cloud-config${env}.yml`;
}

function bind(target: any, envVariables: any) {
  for (const key of Object.keys(envVariables)) {
    process.env[key] = envVariables[key];
  }
}

function setEnvVariables(envVariables: any) {
  for (const key of Object.keys(envVariables)) {
    process.env[key] = envVariables[key];
  }
}

export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv };
