"use strict";

var _require = require('./index'),
  parseEnvFile = _require.parseEnvFile;
describe('parseEnvFile', function () {
  it('should parse env file correctly', function () {
    var envData = 'KEY1=VALUE1\nKEY2=VALUE2';
    var expectedOutput = {
      KEY1: 'VALUE1',
      KEY2: 'VALUE2'
    };
    var result = parseEnvFile(envData);
    expect(result).toEqual(expectedOutput);
  });
});