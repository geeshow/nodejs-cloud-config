# Change Log

All notable changes to the "nodejs-cloud-config" will be documented in this file. 

## [v0.2.0](https://github.com/geeshow/nodejs-cloud-config/commit/be47a253d7ec8cfc41fda89dc5e7719229759403) - 2024-02-11

### Features

* Added `Github cli` command to download cloud config file from remote repository

## [v0.1.2](https://github.com/geeshow/nodejs-cloud-config/commit/a00af33f9e3e1d9af9bae213522b1d2f7207b209) - 2024-02-19

### Bug Fixes

* Missing `commander`, `cross-spawn` package in package.json

### Features

* Supported ES6, CommonJS and Typescript
* Supported Node CLI in package.json
    - `cloud-config` command
    - `cloud-config -e dev` command
    - `cloud-config -v` command

## [v0.8.0](https://github.com/geeshow/nodejs-cloud-config/commit/be47a253d7ec8cfc41fda89dc5e7719229759403) - 2024-02-11

### Features

* Load environment variables using 
  - Spring cloud config server
  - Remote repository on Github (with Personal Access Token)
  - External URL
