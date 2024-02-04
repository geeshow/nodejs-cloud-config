const { fetchEnvFile } = require('./url-fetcher');

describe('fetchEnvFile', () => {
  it('should fetch env file correctly', async () => {
    const param = {
      url: 'https://jsonplaceholder.typicode.com/todos/1'
    }
    const result = await fetchEnvFile(param);
    console.log('result', result)

    expect(result).toBe(`{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}`);
  });
});
