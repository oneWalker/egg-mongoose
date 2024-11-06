# egg-mongoose

[![NPM version][npm-image]][npm-url]
[![Run tests](https://github.com/eggjs/egg-mongoose/actions/workflows/autoUnitTest.yml/badge.svg)](https://github.com/eggjs/egg-mongoose/actions/workflows/autoUnitTest.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mongoose.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@onewalker/egg-mongoose
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-mongoose.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-mongoose?branch=master
[snyk-image]: https://snyk.io/test/npm/egg-mongoose/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mongoose
[download-image]: https://img.shields.io/npm/dm/@onewalker/egg-mongoose.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/@onewalker/egg-mongoose


Egg's mongoose plugin.

## Notice
The plugin is a ahead version of egg-mongoose with some features not supported in the official one.
It's keep up to date with the latest version of official [egg-mongoose](https://github.com/eggjs/egg-mongoose).
The new features are not supported in the current official one. Pull Requests link: https://xgithub.com/eggjs/egg-mongoose/pull/60 
- place the model files in a custom location
- rename the delegate property to `Context`. 


## Install

```bash
$ npm i @onewalker/egg-mongoose --save
```

## Configuration

Enable the `egg-mongoose` plugin by modifying `{app_root}/config/plugin.js`:

```js
exports.mongoose = {
  enable: true,
  package: '@onewalker/egg-mongoose',
};
```

## Simple Connection

### Config

```js
// {app_root}/config/config.default.js
exports.mongoose = {
  url: 'mongodb://127.0.0.1/example',
  options: {},
  // mongoose global plugins, expected a function or an array of function and options
  plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
};

// Recommended
exports.mongoose = {
  // baseDir: 'model', // models in `app/${model}`, // define the dir of model
  // delegate: 'model' // load to `app[delegate]`  // define the delegate
  client: {
    url: 'mongodb://127.0.0.1/example',
    options: {},
    // mongoose global plugins, expected a function or an array of function and options
    plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
  },
};
```

### Example

```js
// {app_root}/app/model/user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  });

  return mongoose.model('User', UserSchema);
};

// {app_root}/app/controller/user.js
exports.index = function* (ctx) {
  ctx.body = yield ctx.model.User.find({});
};
```

## Multiple Connections

### Config

```js
// {app_root}/config/config.default.js
exports.mongoose = {
  clients: {
    // clientId, access the client instance by app.mongooseDB.get('clientId')
    db1: {
      url: 'mongodb://127.0.0.1/example1',
      options: {},
      // client scope plugin array
      plugins: [],
    },
    db2: {
      url: 'mongodb://127.0.0.1/example2',
      options: {},
    },
  },
  // public scope plugin array
  plugins: [],
};
```

### Example

```js
// {app_root}/app/{baseDir}/user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('db1');

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  });

  return conn.model('User', UserSchema);
};

// {app_root}/app/{baseDir}/book.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('db2');

  const BookSchema = new Schema({
    name: { type: String },
  });

  return conn.model('Book', BookSchema);
};

// app/controller/user.js
exports.index = function* (ctx) {
  ctx.body = yield ctx.model.User.find({}); // get data from db1
};

// app/controller/book.js
exports.index = function* (ctx) {
  ctx.body = yield ctx.model.Book.find({}); // get data from db2
};
```

### Default Config

See [config/config.default.js](config/config.default.js) for more details.

## Multi-Mongos Support

```js
// {app_root}/config/config.default.js
exports.mongoose = {
  client: {
    url: 'mongodb://mongosA:27501,mongosB:27501',
    options: {
      mongos: true,
    },
  },
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/oneWalker/egg-mongoose/issues).

## Contribution

If you are a contributor, follow [CONTRIBUTING](https://eggjs.org/zh-cn/contributing.html).

## License

[MIT](LICENSE)

