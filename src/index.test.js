const { loadEnvFromUrl, setEnvVariables } = require('./index');
const { fetchEnvFile } = require('./fetcher/url-fetcher');
const { parseEnvFile } = require('./parser');

jest.mock('./fetcher/url-fetcher');
jest.mock('./parser');

describe('loadEnvFromUrl', () => {
  it('should fetch env file and set env variables', async () => {
    const mockUrl = 'http://example.com/envfile';
    const mockEnvData = 'KEY=VALUE';
    const mockEnvVariables = { KEY: 'VALUE' };

    fetchEnvFile.mockResolvedValue(mockEnvData);
    parseEnvFile.mockReturnValue(mockEnvVariables);

    await loadEnvFromUrl(mockUrl);

    expect(fetchEnvFile).toHaveBeenCalledWith(mockUrl);
    expect(parseEnvFile).toHaveBeenCalledWith(mockEnvData);
    expect(process.env.KEY).toBe('VALUE');
  });

  it('should log error if fetching env file fails', async () => {
    const mockUrl = 'http://example.com/envfile';
    const mockError = new Error('Network error');

    fetchEnvFile.mockRejectedValue(mockError);
    console.error = jest.fn();

    await loadEnvFromUrl(mockUrl);

    expect(console.error).toHaveBeenCalledWith(`Error fetching the env file: ${mockError.message}`);
  });
});

describe('setEnvVariables', () => {
  it('should set env variables', () => {
    const mockEnvVariables = { KEY1: 'VALUE1', KEY2: 'VALUE2' };

    setEnvVariables(mockEnvVariables);

    expect(process.env.KEY1).toBe('VALUE1');
    expect(process.env.KEY2).toBe('VALUE2');
  });
});
