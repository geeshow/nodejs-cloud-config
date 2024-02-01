const fetch = require('isomorphic-fetch');

async function fetchEnvFile(url) {
  const response = await fetch(url);
  return await response.text();
}

module.exports = { fetchEnvFile }
