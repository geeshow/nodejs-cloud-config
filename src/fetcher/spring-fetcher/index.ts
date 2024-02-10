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
  constructor(param: FetchEnvSpringParam) {
    this.param = param
  }
  async fetchEnvFile() {
    const springCloudConfigRequestUrl = this.param.label ?
        `${this.param.serverUrl}/${this.param.applicationName}/${this.param.profile}/${this.param.label}` :
        `${this.param.serverUrl}/${this.param.applicationName}/${this.param.profile}`;
    const springText = await getUrlContent(springCloudConfigRequestUrl);
    const springApplicationData: ISpringApplicationConfig = JSON.parse(springText);
    
    const mapData = springApplicationData.propertySources
        .reduce((acc, cur) => {
          return {
            ...acc,
            ...cur.source
          }
        }, {} as IEnv)
    return mapData as IEnv;
  }
}
