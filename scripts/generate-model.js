//generate model from database

require('dotenv').config();

const fs = require('fs-extra');
const path = require('path');
const ObjectionModelGenerator = require('objection-model-generator');
const { db } = require('../lib/config');

const main = async () => {
  let omg = new ObjectionModelGenerator(db, db.database);
  let models = await omg.createModels();
  let pathModel = path.join(__dirname, '../src/api/models');
  let pathFile = path.join(pathModel, 'access.js');
  await fs.writeFile(pathFile, models);
  console.log('\n -> file writed:', pathFile);
}

main();