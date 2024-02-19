# nodejs-cloud-config

This library is used to load environment variables from a remote repository or an external URL in Node.js.

## Usage
You can load environment variables using the cli command or during Node runtime.
Please refer to the detailed description of the usage below.

- package.json
```json
{
  "scripts": {
    "default": "cloud-config react-scripts start", // use .cloud-config.yml
    "react-local": "cloud-config -e local react-scripts start",
    "react-stage": "cloud-config -e stage react-scripts start",
    "express-dev": "cloud-config -e dev node -r ts-node/register -r tsconfig-paths/register src/index.ts",
    "express-dev-with-NODE_ENV": "NODE_ENV=dev cloud-config -e dev node -r ts-node/register -r tsconfig-paths/register src/index.ts",
  }
}
```

-e, --environment: Set the environment variable to load. If not set, the default environment variable(`.cloud-config.yml`) is loaded.

You can use environment variables using `process.env`
In the React environment, use the environment variable naming rule by adding `REACT_APP_`.

- Runtime
```javascript
import CloudConfig from 'nodejs-cloud-config';
CloudConfig.load((config) => {
  console.log('Loaded config in Callback: ', config);

  // Bind the loaded config to the process.env
  CloudConfig.bind(config, process.env);
}).then((config) => {
  console.log('Loaded config in Promise: ', config);
})
```
You can load environment variables during Node runtime. This library returns a Promise, so the logic that requires environment variables should be used after the .env file is loaded.


```javascript
const config = await CloudConfig.load();
console.log('Loaded config in async/await', config);
// Bind the loaded config to the process.env
CloudConfig.bind(config, process.env);
```


## Features
Load environment variables using 
- Spring cloud config server
- Remote repository on Github (with Personal Access Token)
- External URL

## Tested environments
The following environments have been tested.

| Platform | Version |
|----------|---------|
| Node     | 20.9.0 |
| React    | 18.2.0 |
| Express  | 4.18.2 |

## Supported remote configuration file format

<div style="color:wheat;">
The environment variable file in the remote repository supports the following formats. The loaded environment variables are returned as a `config` object of type Map.
</div>

- Yml/yaml
- Json
- Key=value (.env)
---

## Step 1. Installation
```bash
npm install nodejs-cloud-config
```

## Step 2. Make a cloud config
Cloud config requires a configuration file. The configuration file uses yml and has the following format.
file: cloud-config.{Environment}.yml (e.g. cloud-config.development.yml)
If you don't set the Environment of CLI, the file name will be `cloud-config.yml`.

```
PROJECT_ROOT/.cloud-config.yml (default)
PROJECT_ROOT/.cloud-config.dev.yml (environment=dev)
PROJECT_ROOT/.cloud-config.prod.yml (environment=prod)
```


## Step 3. Set cloud config file
Cloud config can load remote environment variables in the following ways.

### type 1. remote url ![remote](https://img.shields.io/badge/remote-url-blue)
Load environment variables using a public URL. Since the URL is public, be careful as it may be exposed to the outside world.

```yaml
# .cloud-config.yml
remote:
  type: url
  format: json // or yml, yaml, env, key=value
  param:
    url: (Your Config file URL)
  debug: false
```

### type 2. github repository ![github](https://img.shields.io/badge/github-blue) 
Load environment variables using a remote repository on Github. To use a remote repository on Github, you need a `personal accesss token` with read permission.

```yaml
# .cloud-config.yml
remote:
  type: git
  format: json // or yml, yaml, env, key=value
  param:
    token: # Your GitHub token
    owner: # Your GitHub username
    repo: # Your GitHub repository
    path: # Your GitHub file path
    branch: # Your GitHub branch name
  debug: false
```
### type 3. spring cloud config server ![spring-cloud-config](https://img.shields.io/badge/spring--cloud--config-blue) 
Load environment variables using a spring cloud config server. To use a spring cloud config server, you need a URL where the spring cloud config server is running.

```yaml
# .cloud-config.yml
remote:
  type: spring
  format: json
  param:
    serverUrl: http://localhost:9078
    applicationName: user-service
    profile: live, stage
```

## Step 3-1. use command chain in package.json
The cloud config can be used as a command chain in the script of the command package.json.

| Option            | Description |
|-------------------|-------------|
| -e, --environment | Set the environment variable to load. If not set, the default environment variable(`.cloud-config.yml`) is loaded. |
| -v, --version     | Show version number |

### Example - check version
```bash
> cloud-config -v
```

### Example - Package.json
```json
{
  "scripts": {
    "default": "cloud-config react-scripts start", // use .cloud-config.yml
    "react-local": "cloud-config -e local react-scripts start",
    "react-stage": "cloud-config -e stage react-scripts start",
    "express-dev": "cloud-config -e dev node -r ts-node/register -r tsconfig-paths/register src/index.ts",
    "express-dev-with-NODE_ENV": "NODE_ENV=dev cloud-config -e dev node -r ts-node/register -r tsconfig-paths/register src/index.ts",
  }
}
```

## Step 3-2. use in your app
There is also a way to use it directly in the program source without using the command chain.
Cloud config returns a Promise because it uses external resources. Therefore, the logic that requires environment variables should be used after the .env file is loaded.
The initial execution logic should be executed after cloud config is completed as follows.
ex) Write the code to load cloud config in /src/index.ts and write the code to run the server in /src/app.ts.

> It is not yet supported in browser environments such as React and Vue.

### Express example ![express](https://img.shields.io/badge/express-blue)

```javascript
import CloudConfig from 'nodejs-cloud-config';
import { IConfig } from 'nodejs-cloud-config/dist/fetcher';

CloudConfig.load((config: IConfig) => {
  console.log('Loaded config in Callback: ', config);
}).then((config) => {
  console.log('Loaded config in Promise: ', config);
})
```
The loaded environment variables are returned as a `config` object of type Map<string, string>.

### Bind the loaded config to the process.env
```javascript
import CloudConfig from 'nodejs-cloud-config';
CloudConfig.load((config) => {
  console.log('Loaded config in Callback: ', config);

  // Bind the loaded config to the process.env
  CloudConfig.bind(config, process.env);
})
```

### Spring cloud config example ![express](https://img.shields.io/badge/express-blue)
You can access environment variables with '.' as in spring type environment variables.

```javascript
import express, { Application } from 'express';
import CloudConfig from 'nodejs-cloud-config';
CloudConfig.load((config) => {
  console.log('Loaded config in Callback: ', config);

  // Without binding the loaded config to the process.env
  // const port = config['server.port'];
  // const apiUrl = config['api.myserver.url'];

  // Bind the loaded config to the process.env
  CloudConfig.bind(config, process.env);
  const port = process.env['server.port'];
  const apiUrl = process.env['api.myserver.url'];
});
```

### Nestjs example ![nestjs](https://img.shields.io/badge/nestjs-blue)
```javascript


import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import CloudConfig from 'nodejs-cloud-config';

async function bootstrap() {
  const config = await CloudConfig.load();
  console.log('Loaded config in async/await', config);
  // Bind the loaded config to the process.env
  CloudConfig.bind(config, process.env);
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  // await app.listen(process.env.PORT); // You can also use process.env directly
}
bootstrap();

```
---
