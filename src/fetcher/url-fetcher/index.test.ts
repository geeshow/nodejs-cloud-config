import { fetchEnvFile } from './index';

describe('url-fetcher', () => {
  it('should fetch env file from url', async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const result = JSON.parse(await fetchEnvFile({ url }) as any);
    console.log('result', result);
    expect(result).toStrictEqual({ userId: 1, id: 1, title: 'delectus aut autem', completed: false });
  });
});
