import http from 'http';
import https from 'https';

export function getUrlContent(url: string) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const request = lib.get(url, (response) => {
      if (response.statusCode && (response.statusCode < 200 || response.statusCode > 299)) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      const body: any[] = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
  }) as Promise<string>;
}
