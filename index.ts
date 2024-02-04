import {parseEnvFile, parseYmlFile} from './lib/parser';
import {getFileContent} from './lib/file-reader';

export default async function loadEnv() {
  const cloudConfigFilename = getCloudConfigFilenameByNodeEnv();
  const cloudConfigFile = getFileContent(`${process.cwd()}/${cloudConfigFilename}`);
  const config = getTypedConfig(cloudConfigFile);
  console.log('config', config)

  try {
    const fetcher = require(`./fetcher/${config.type}-fetcher`);
    const envData = await fetcher.fetchEnvFile(config.param);
    console.log('envData', envData)
    const envVariables = parseEnvFile(envData);
    setEnvVariables(envVariables);

    console.log(`Successfully loaded env from ${config.type}:`, config.param);
  } catch (error) {
    console.error(`Error fetching the env file: ${error}`);
  }
}

function getCloudConfigFilenameByNodeEnv() {
  const env = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
  return `.cloud-config${env}.yml`;
}

function getTypedConfig(cloudConfigFilePath: string) {
  const config = parseYmlFile(cloudConfigFilePath);
  const type = config.remote.type.toLocaleLowerCase();
  const param = config.remote.param;
  return { type, param };
}


function setEnvVariables(envVariables: any) {
  for (const key of Object.keys(envVariables)) {
    process.env[key] = envVariables[key];
  }
}

export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv, getTypedConfig };
