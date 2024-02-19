import loadEnv from "./load";
import {IConfig} from "./fetcher";
import {parseArgs} from "./utils/parser";
import crossSpawn from 'cross-spawn';

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
  
  static CLI(args: string[]) {
    const program = parseArgs(args);
    const useShell = !!program.useShell;
    process.env.CLOUD_CONFIG_ENV = program.opts().environment;
    
    this.load((config: IConfig) => {
      const command = program.args[0];
      if (command !== undefined) {
        const commandArgs = args.splice(args.indexOf(command) + 1);
        const env = Object.assign({}, process.env, config);
        
        // Run the command
        crossSpawn(command, commandArgs,
            {
              stdio: 'inherit',
              shell: useShell,
              env
            });
      }
    })
  }
}
