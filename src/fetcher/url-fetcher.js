import fetch from 'isomorphic-fetch';

export async function fetchEnvFile(url) {
  const response = await fetch(url);
  return await response.text();
}
