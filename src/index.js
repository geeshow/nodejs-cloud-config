const { fetchEnvFile } = require('./fetcher/url-fetcher');
const { parseEnvFile } = require('./parser');

async function loadEnvFromUrl(url) {
  try {
    const envData = await fetchEnvFile(url);
    const envVariables = parseEnvFile(envData);
    setEnvVariables(envVariables);
  } catch (error) {
    console.error(`Error fetching the env file: ${error.message}`);
  }
}

function setEnvVariables(envVariables) {
  for (const key of Object.keys(envVariables)) {
    process.env[key] = envVariables[key];
    console.log(`Setting ${key} to ${envVariables[key]}`);
  }
}

// 여기서 URL을 지정합니다. 예: 'http://example.com/path/to/your/envfile'
const url = 'CLOUD.CONFIG.IMPORT.URL: https://cdn.terafunding.com/Common/.env.local';
loadEnvFromUrl(url).then(r => console.log('cloud config file loaded'));

module.exports = { loadEnvFromUrl, setEnvVariables };
