const { parseEnvFile } = require('./parser');

describe('parseEnvFile', () => {
  it('should parse env file correctly', () => {
    const envData = 'KEY1=VALUE1\nKEY2=VALUE2';
    const expectedOutput = { KEY1: 'VALUE1', KEY2: 'VALUE2' };

    const result = parseEnvFile(envData);

    expect(result).toEqual(expectedOutput);
  });
});
