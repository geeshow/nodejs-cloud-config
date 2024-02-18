import http from 'http';
import https from 'https';

console.log('node url-reader.ts');

export function getUrlContent(url: string, headers?: any) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        ...headers
      }
    }
    const request = lib.get(url, options, (response) => {
      if (response.statusCode && (response.statusCode < 200 || response.statusCode > 299)) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      const body: any[] = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => {
      console.log('Error: ', err.message)
      reject(err)
    })
  }) as Promise<string>;
}
