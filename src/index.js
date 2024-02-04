import {parseEnvFile, parseYmlFile} from './utils/parser';
import {getFileContent} from './utils/file-reader';

/**
 * Load env file from cloud and set it to process.env using fetcher module and utils module
 * @returns {Promise<void>}
 * @private
 */
async function loadEnv() {
  const cloudConfigFilename = getCloudConfigFilenameByNodeEnv();
  const cloudConfigFile = getFileContent(`${process.cwd()}/${cloudConfigFilename}`);
  const config = getTypedConfig(cloudConfigFile);

  try {
    const fetcher = require(`./fetcher/${config.type}-fetcher.js`);
    const envData = await fetcher.fetchEnvFile(config.param);
    const envVariables = parseEnvFile(envData);
    setEnvVariables(envVariables);

    console.log(`Successfully loaded env from ${config.type}:`, config.param);
  } catch (error) {
    console.error(`Error fetching the env file: ${error.message}`);
  }
}

function getCloudConfigFilenameByNodeEnv() {
  const env = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
  return `.cloud-config${env}.yml`;
}

function getTypedConfig(cloudConfigFile) {
  const config = parseYmlFile(cloudConfigFile);
  const type = config.remote.type.toLocaleLowerCase();
  const param = config.remote.param[type];
  return { type, param };
}


function setEnvVariables(envVariables) {
  for (const key of Object.keys(envVariables)) {
    process.env[key] = envVariables[key];
  }
}

export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv, getTypedConfig };

