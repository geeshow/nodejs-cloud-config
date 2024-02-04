import {getCloudConfigFilenameByNodeEnv, getTypedConfig, setEnvVariables, loadEnv} from './index';

describe('getCloudConfigFilenameByNodeEnv', () => {
  it('should read cloud config file by default', () => {
    process.env.NODE_ENV = '';
    const filepath = getCloudConfigFilenameByNodeEnv();
    expect(filepath).toEqual(`.cloud-config.yml`);
  })
  
  it('should read cloud config file on test env', () => {
    process.env.NODE_ENV = 'test';
    const filepath = getCloudConfigFilenameByNodeEnv();
    expect(filepath).toEqual(`.cloud-config.test.yml`);
  })
});

describe('getTypedConfig', () => {
  it('should parse cloud config file and return type and param', () => {
    const mockCloudConfigFile = `
remote:
  type: url
  param:
    url: https://config.remoteurl.com/project-name/.env`;
    
    const result = getTypedConfig(mockCloudConfigFile);
    
    expect(result).toEqual({ type: 'url', param: { url: 'https://config.remoteurl.com/project-name/.env' } });
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

describe('loadEnv', () => {
  it('should fetch env file and set env variables', async () => {
    const mockFetchEnvFile = jest.fn().mockResolvedValue('KEY=VALUE');
    
    jest.mock('./fetcher/git-fetcher', () => {
      return {
        fetchEnvFile: mockFetchEnvFile
      };
    });
    
    const { fetchEnvFile } = require('./fetcher/git-fetcher');
    
    await loadEnv();
    
    expect(mockFetchEnvFile).toHaveBeenCalledWith({ token: null, owner: null, repo: null, path: null });
    expect(process.env.KEY).toBe('VALUE');
  });
});
