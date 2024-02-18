console.log('browser url-reader.ts');
export function getUrlContent(url: string, headers?: any) {
  let request = new XMLHttpRequest();
  request.open('GET', url, false);
  headers && Object.keys(headers).forEach(key => {
    request.setRequestHeader(key, headers[key]);
  });
  
  return new Promise((resolve, reject) => {
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(new Error('Failed to load page, status code: ' + request.status));
        }
      }
    };
    request.send();
  }) as Promise<string>;
}
