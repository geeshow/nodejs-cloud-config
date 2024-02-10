import {Fetcher, IEnv} from "../index";
import {getUrlContent} from "../../utils/url-reader";

export interface FetchEnvSpringParam {
  serverUrl: string;
  applicationName: string;
  profile: string;
  label?: string;
}

interface ISpringApplicationConfig {
  name: string,
  profiles: [string],
  label: string | null,
  propertySources: [{
    name: string,
    source: {}
  }]
}

export class SpringFetcher implements Fetcher {
  private param: FetchEnvSpringParam;
  private readonly parser: any;
  private response: any;
  constructor(param: FetchEnvSpringParam, parser: any) {
    this.param = param;
    this.parser = parser;
  }

  async fetchConfigFromRemote() {
    const springCloudConfigRequestUrl = this.param.label ?
        `${this.param.serverUrl}/${this.param.applicationName}/${this.param.profile}/${this.param.label}` :
        `${this.param.serverUrl}/${this.param.applicationName}/${this.param.profile}`;
    this.response = await getUrlContent(springCloudConfigRequestUrl);
  }
  
  parseToMapData() {
    if (!this.response) {
      throw new Error('fetchConfigFromRemote should be called before parseToMapData');
    }
    
    const springApplicationData: ISpringApplicationConfig = this.parser(this.response);
    return springApplicationData.propertySources
        .reduce((acc, cur) => {
          return {
            ...acc,
            ...cur.source
          }
        }, {} as IEnv)
  }
}
