import {parseJsonFormat, parseKeyValueFormat, parseYmlFormat} from './utils/parser';
import {getFileContent} from './utils/file-reader';
import {createFetcher, Fetcher} from "./fetcher";
import {FetchEnvUrlParam} from "./fetcher/url-fetcher";
import {FetchEnvGitParam} from "./fetcher/git-fetcher";
import {FetchEnvSpringParam} from "./fetcher/spring-fetcher";

export type IRemoteType = 'url' | 'git' | 'spring'
export type IRemoteFormatType = 'json' | 'yml' | 'yaml' | 'properties' | 'key=value'
export interface YmlConfigFile {
  remote: {
    type: IRemoteType
    format: IRemoteFormatType
    param: FetchEnvUrlParam | FetchEnvGitParam | FetchEnvSpringParam
  }
}

export default async function loadEnv() {
  const cloudConfigFilename = getCloudConfigFilenameByNodeEnv();
  const cloudConfigFilePath = getFileContent(`${process.cwd()}/${cloudConfigFilename}`);
  const config = parseYmlFormat(cloudConfigFilePath) as YmlConfigFile;

  try {
    const fetcher: Fetcher = createFetcher(config);
    await fetcher.fetchConfigFromRemote();
    const envVariables = fetcher.parseToMapData();
    setEnvVariables(envVariables);

    console.log(`Successfully loaded env from ${config.remote.type}:`, config.remote.param);
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
    case 'properties':
      return parseKeyValueFormat(remoteConfigFile);
    default:
      return remoteConfigFile
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

// loadEnv();

export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv };
