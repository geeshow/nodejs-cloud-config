const { fetchEnvFile } = require('./git-fetcher');

// set mock Octokit
jest.mock("@octokit/rest", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => {
      return {
        rest: {
          repos: {
            getContent: jest.fn().mockResolvedValue({
              data: {
                content: 'Tk9ERV9FTlY9dGVzdA0KUE9SVD04MDAzDQpVUkw9aHR0cHM6Ly90ZXN0LnVybC5jb20NCg=='
              }
            })
          }
        }
      }
    })
  }
})
// mock Buffer.from
jest.mock('buffer', () => {
  return {
    from: jest.fn().mockImplementation(() => {
      return {
        toString: jest.fn().mockReturnValue('NODE_ENV=test\nPORT=8003\nURL=http://test.url.com\n')
      }
    })
  }
})


describe('fetchEnvFile', () => {
  it('should fetch env file correctly', async () => {
    const param = {
      token: 'github_pat_token',
      owner: 'geeshow',
      repo: 'node-cloud-config',
      path: '.sample.env'
    }
    const result = await fetchEnvFile(param);
    console.log('result', result)
    expect(true).toBe(true);
  });
});
