import fetch from 'isomorphic-fetch';

export async function fetchEnvFile(param: { url: string }) {
  console.log('param', param)
  const response = await fetch(param.url);
  console.log('response', response)
  return await response.text();
}
