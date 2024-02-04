# node-cloud-config

[![Build Status](https://travis-ci.org/mbroadst/node-cloud-config.svg?branch=main)](https://travis-ci.org/mbroadst/node-cloud-config)
[![Coverage Status](https://coveralls.io/repos/github/mbroadst/node-cloud-config/badge.svg?branch=main)](https://coveralls.io/github/mbroadst/node-cloud-config?branch=main)
[![npm version](https://badge.fury.io/js/node-cloud-config.svg)](https://badge.fury.io/js/node-cloud-config)

이 라이브러리는 Node.js의 Github 원격 저장소, 외부 URL을 이용해 환경변수를 로드하는 라이브러리입니다. 

This library is used to load environment variables from a remote repository or an external URL in Node.js.

---

## Step 1. Installation
```bash
npm install node-cloud-config
```

## Step 2. Make a cloud config
Cloud config은 기본적으로 설정파일을 요구합니다. 설정파일은 yml을 사용하며 파일명은 다음과 같은 형식을 가집니다.
file: cloud-config.{NODE_ENV}.yml (e.g. cloud-config.development.yml)
NODE_ENV를 사용하지 않을 경우, 파일명은 `cloud-config.yml`이 됩니다.

<div style="color:wheat;">
Cloud config requires a configuration file. The configuration file uses yml and has the following format.
file: cloud-config.{NODE_ENV}.yml (e.g. cloud-config.development.yml)
If you don't use NODE_ENV, the file name will be `cloud-config.yml`.
</div>

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
remote:
  type: url
  param:
    url: https://jsonplaceholder.typicode.com/todos/1
```

### type 2. github repository ![github](https://img.shields.io/badge/github-blue) 
Github의 원격 저장소를 이용해 환경변수를 로드합니다. Github의 원격 저장소를 사용하기 위해서는 read 권한이 있는 `token`이 필요합니다.

<div style="color:wheat;">
Load environment variables using a remote repository on Github. To use a remote repository on Github, you need a `token` with read permission.
</div>

```yaml
remote:
  type: git
  param:
    token: # Your GitHub token
    owner: # Your GitHub username
    repo: # Your GitHub repository
    path: # Your GitHub file path
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

```javascript
import cloudConfig from 'cloud-config';
import express, { Application } from 'express';
cloudConfig().then(() => {
  console.log('Cloud config loaded');
  
  // .env file is loaded at this point
  // You can use process.env to access your environment variables
  
  // start your app here
  // require('app')
  
  // or
  
  // const app: Application = express();
  // const port = process.env.PORT;
});
```
---
