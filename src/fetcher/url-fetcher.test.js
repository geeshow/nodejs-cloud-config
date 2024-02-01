const fetch = require('isomorphic-fetch');
const { fetchEnvFile } = require('./url-fetcher');

jest.mock('isomorphic-fetch');

describe('fetchEnvFile', () => {
  it('should fetch env file correctly', async () => {
    const mockUrl = 'http://example.com/envfile';
    const mockResponse = { text: jest.fn().mockResolvedValue('KEY=VALUE') };

    fetch.mockResolvedValue(mockResponse);

    const result = await fetchEnvFile(mockUrl);

    expect(fetch).toHaveBeenCalledWith(mockUrl);
    expect(result).toBe('KEY=VALUE');
  });
});
