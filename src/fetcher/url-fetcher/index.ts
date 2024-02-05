import fetch from 'isomorphic-fetch';

export async function fetchEnvFile(param: { url: string }) {
  const response = await fetch(param.url);
  return await response.text();
}
