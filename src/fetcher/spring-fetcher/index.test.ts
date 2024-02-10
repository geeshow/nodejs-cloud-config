import { SpringFetcher, FetchEnvSpringParam } from './index';
import * as urlReader from '../../utils/url-reader';
import {getUrlContent} from "../../utils/url-reader";

jest.mock("../../utils/url-reader", () => {
  return {
    getUrlContent: jest.fn().mockResolvedValue(`{
      "name": "sample-service",
      "profiles": [
        "live"
      ],
      "label": null,
      "version": "9cd21454e17914d444053c4b242a8a0618114df7",
      "state": null,
      "propertySources": [
        {
          "name": "file:///Users/geeshow/backend/cloud-config/user-service-stage.yml",
          "source": {
            "user.best.hostIP": "10.11.12.1",
            "user.test.hostIP": "10.11.12.2"
          }
        }
      ]
    }`)
  };
});

describe('SpringFetcher', () => {
  let fetchEnvSpringParam: FetchEnvSpringParam;
  let springFetcher: SpringFetcher;

  beforeEach(() => {
    fetchEnvSpringParam = {
      serverUrl: 'http://localhost:9078',
      applicationName: 'user-service',
      profile: 'live'
    };
    springFetcher = new SpringFetcher(fetchEnvSpringParam);
  });

  it('should fetch env file', async () => {
    const result = await springFetcher.fetchEnvFile();

    // expect(mockGetUrlContent).toHaveBeenCalledWith(`${fetchEnvSpringParam.serverUrl}/${fetchEnvSpringParam.applicationName}/${fetchEnvSpringParam.profile}`);
    // expect(result).toBe('KEY=VALUE');
    expect(result['user.best.hostIP']).toBe('10.11.12.1');
    expect(result['user.test.hostIP']).toBe('10.11.12.2');
  });
});