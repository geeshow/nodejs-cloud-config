import loadEnv from "./load";
import {IConfig} from "./fetcher";

export default class CloudConfig {
  static async load(callback?: (arg: IConfig) => void) {
    return new Promise((resolve, reject) => {
      loadEnv().then((remoteConfig) => {
        if (callback) {
          callback(remoteConfig as IConfig);
        }
        resolve(remoteConfig);
      }).catch((error) => {
        reject(error);
      });
    })
  }
  
  static bind(envVariables: IConfig, target: any) {
    for (const key of Object.keys(envVariables)) {
      target[key] = envVariables[key];
    }
  }
}
