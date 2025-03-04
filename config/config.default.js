'use strict';

/**
  * mongoose default config
  * http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection
  * @member Config#mongoose
  * @property {String} url - connect url
  * @property {Object} options - options to pass to the driver and mongoose-specific
  */
exports.mongoose = {
  url: '',
  options: {},
  plugins: [],
  loadModel: true,
  app: true,
  agent: false,
  baseDir: 'model', // models in `app/${model}`,the default is `app/model`
  delegate: 'model', // load to `app[delegate]`,the default is app.model
};
