# ReacThor

WebApp Boilerplate. Frontend Starter Kit using React, Webpack in a basic level.

## 1. Requirements

- Node ~5.11.0 at least, npm ~3.8.6 recommanded (use [nvm](https://github.com/creationix/nvm) for version manager

## 2. Install

```
nvm use
npm install
```

## 3. Commands

**Bootstrap an APP with specified name and port**

```
npm start -- --app "APP_NAME" --port 7001
```

*--port is optional, if not given, a default port is defined (host/port will be displayed in console when launched)*

**Bootstrap an APP**

```
npm start -- --app "APP_NAME"
```

**Bootstrap multiple APPs**

```
npm start -- --app "APP_01" --app "APP_02"
```

**Launch APP**

```
npm run-script run
```

**Warning**

Running `npm start ...` will define a new app each time.
Previous created folder will be deleted.

## 4. Your app

**npm start will initiaite your project. The frontend is in `/s_client` folder. DO NOT PAY ATTENTION TO /s_server.**

**You can then work in your app, modifying `/s_client/APP_NAME/main.js` as you want**

**You can view your app in `http://localhost:PORT/static/APP_NAME`**

*Default app port start from 7001*

## 5. Example

```
npm start -- --app "app"
npm run-script run
```

An app with "app" will be created and accessible through

[http://localhost:7001/static/app/](http://localhost:7001/static/app)

*Default app port start from 7001*

## TODO

- command line usage
- build script/command