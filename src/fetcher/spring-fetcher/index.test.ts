import { SpringFetcher, FetchEnvSpringParam } from './index';
import * as urlReader from '../../utils/node/url-reader';
import {getUrlContent} from "../../utils/node/url-reader";
import {parseJsonFormat, parseKeyValueFormat} from "../../utils/parser";

jest.mock("../../utils/node/url-reader", () => {
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
    const parser = parseJsonFormat
    fetchEnvSpringParam = {
      serverUrl: 'http://localhost:9078',
      applicationName: 'user-service',
      profile: 'live'
    };
    springFetcher = new SpringFetcher(fetchEnvSpringParam, parser);
  });

  it('should fetch env file', async () => {
    await springFetcher.fetchConfigFromRemote();
    const result = springFetcher.parseToMapData();

    // expect(mockGetUrlContent).toHaveBeenCalledWith(`${fetchEnvSpringParam.serverUrl}/${fetchEnvSpringParam.applicationName}/${fetchEnvSpringParam.profile}`);
    // expect(result).toBe('KEY=VALUE');
    expect(result['user.best.hostIP']).toBe('10.11.12.1');
    expect(result['user.test.hostIP']).toBe('10.11.12.2');
  });
});
