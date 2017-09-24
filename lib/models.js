'use strict';

const fs = require('fs');
const join = require('path').join;

module.exports = (sequelize, modelPath) => {
  const models = {};
  if (!(modelPath instanceof Array)) {
      modelPath = [modelPath];
      }

  // Bootstrap models
  const alenght = modelPath.length;
  for (let i = 0; i < alenght; i++) {
    fs.readdirSync(modelPath[i])
    .forEach(function(file) {
      if (/\.js$/.test(file)) {
        const model = sequelize.import(join(modelPath[i], file));
        models[model.name] = model;
      }
    });
  }

  Object.keys(models).forEach(function(modelName) {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models;
};
