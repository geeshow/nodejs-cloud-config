import {getCloudConfigFilenameByNodeEnv, setEnvVariables, loadEnv} from './load';

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

describe('setEnvVariables', () => {
  it('should set env variables', () => {
    const mockEnvVariables = { KEY1: 'VALUE1', KEY2: 'VALUE2' };
    
    setEnvVariables(mockEnvVariables);
    
    expect(process.env.KEY1).toBe('VALUE1');
    expect(process.env.KEY2).toBe('VALUE2');
  });
});


jest.mock('./fetcher/url-fetcher', () => {
  return {
    UrlFetcher: jest.fn().mockImplementation(() => {
      return {
        fetchConfigFromRemote: jest.fn().mockResolvedValue('KEY=VALUE')
      };
    })
  };
});
describe('loadEnv', () => {
  it('should fetch env file and set env variables', async () => {
    await loadEnv();
    expect(process.env['cloud.aws.region.auto']).toBe("false");
  });
});
