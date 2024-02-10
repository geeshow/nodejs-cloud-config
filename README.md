# nodejs-cloud-config

이 라이브러리는 Node.js의 Github 원격 저장소, 외부 URL을 이용해 환경변수를 로드하는 라이브러리입니다. 

This library is used to load environment variables from a remote repository or an external URL in Node.js.

## Features
- [x] Load environment variables using a spring cloud config server
- [x] Load environment variables using a remote repository on Github
- [x] Load environment variables using an external URL

## Supported platforms
- Nestjs
- Express

## Supported configuration file format
- Yml/yaml
- Json
- Key=value (.env)
---

## Step 1. Installation
```bash
npm install nodejs-cloud-config
```

## Step 2. Make a cloud config
Cloud config은 기본적으로 설정파일을 요구합니다. 설정파일은 yml을 사용하며 파일명은 다음과 같은 형식을 가집니다.
file: .cloud-config.{NODE_ENV}.yml (e.g. cloud-config.development.yml)
NODE_ENV를 사용하지 않을 경우, 파일명은 `cloud-config.yml`이 됩니다.
<div style="color:wheat;">
Cloud config requires a configuration file. The configuration file uses yml and has the following format.
file: cloud-config.{NODE_ENV}.yml (e.g. cloud-config.development.yml)
If you don't use NODE_ENV, the file name will be `cloud-config.yml`.
</div>

```
PROJECT_ROOT/.cloud-config.yml (default)
PROJECT_ROOT/.cloud-config.dev.yml (NODE_ENV=dev)
PROJECT_ROOT/.cloud-config.prod.yml (NODE_ENV=prod)
```


## Step 3. Set cloud config file
Cloud config은 두가지 방법으로 환경변수를 로드할 수 있습니다. 첫번째 방법은 외부 URL을 이용해 환경변수를 로드하는 방법이고, 두번째 방법은 Github의 원격 저장소를 이용해 환경변수를 로드하는 방법입니다.

<div style="color:wheat;">
Cloud config can load environment variables in two ways. The first way is to load environment variables using an external URL, and the second way is to load environment variables using a remote repository on Github.
</div>

### type 1. remote url ![remote](https://img.shields.io/badge/remote-url-blue)
외부의 공개된 URL을 이용해 환경변수를 로드합니다. 보안적인 이슈가 있을 수 있으니 주의해주세요.

<div style="color:wheat;">
Load environment variables using an external public URL. Be careful as there may be security issues.
</div>

```yaml
# .cloud-config.yml
remote:
  type: url
  format: json // or yml, yaml, env, key=value
  param:
    url: https://jsonplaceholder.typicode.com/todos/1
  debug: false
```

### type 2. github repository ![github](https://img.shields.io/badge/github-blue) 
Github의 원격 저장소를 이용해 환경변수를 로드합니다. Github의 원격 저장소를 사용하기 위해서는 read 권한이 있는 `token`이 필요합니다.

<div style="color:wheat;">
Load environment variables using a remote repository on Github. To use a remote repository on Github, you need a `token` with read permission.
</div>

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
Spring cloud config server를 이용해 환경변수를 로드합니다. Spring cloud config server를 사용하기 위해서는 spring cloud config server가 실행중인 URL이 필요합니다.

<div style="color:wheat;">
Load environment variables using a spring cloud config server. To use a spring cloud config server, you need a URL where the spring cloud config server is running.
</div>

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

## Step 3. use in your app
Cloud config은 외부 자원을 사용하기 때문에 Promise를 반환합니다. 따라서, 환경변수가 필요한 로직은 .env 파일이 로드된 이후에 사용해야 합니다.
아래와 같이 초기 실행 로직을 cloud config이 완료된 이후에 실행해야 합니다.
ex) /src/index.ts에는 cloud config을 로드하는 코드를 작성하고, /src/app.ts에는 서버를 실행하는 코드를 작성합니다.

<div style="color:wheat;">
Cloud config returns a Promise because it uses external resources. Therefore, the logic that requires environment variables should be used after the .env file is loaded.
The initial execution logic should be executed after cloud config is completed as follows.
ex) Write the code to load cloud config in /src/index.ts and write the code to run the server in /src/app.ts.
</div>

### Express example ![express](https://img.shields.io/badge/express-blue)
```javascript
import CloudConfig from 'nodejs-cloud-config';
CloudConfig.load((config) => {
  console.log('Loaded config in Callback: ', config);

  // Bind the loaded config to the process.env
  CloudConfig.bind(config, process.env);

  // start your app here
  // require('app')

  // or

  // const app: Application = express();
  // const port = process.env.PORT;
}).then((config) => {
  console.log('Loaded config in Promise: ', config);

  // start your app here
  // require('app')

  // or

  // const app: Application = express();
  // const port = process.env.PORT;
})
```

### Spring cloud config example ![express](https://img.shields.io/badge/express-blue)
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
