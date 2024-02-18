import { getUrlContent } from './url-reader';

describe('getUrlContent', () => {
  it('returns content when url is valid', async () => {
    const content = await getUrlContent('https://jsonplaceholder.typicode.com/todos/1');
    console.log('content: ', content);
    expect(content).toBeTruthy();
  });
  
  it('throws error when url is invalid', async () => {
    await expect(getUrlContent('https://no.url.com')).rejects.toThrow();
  });
});
