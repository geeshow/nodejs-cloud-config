import {IConfig} from "./fetcher";
import CloudConfig from "./index";

CloudConfig.load((config: IConfig) => {
  console.log('Loaded config in Callback: ', config);
})
