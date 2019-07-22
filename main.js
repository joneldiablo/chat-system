const express = require('express');
const cors = require('cors')
const path = require('path');
const ApiAccess = require('./lib/ApiAccess');
const PORT = process.env.PORT || 4400;

const main = () => {
  let app = express();
  app.use(cors());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  let buildPath = path.join(__dirname, 'frontend/build');
  app.use('/', express.static(buildPath));
  let api = new ApiAccess();
  app.use('/api', api.app);
  app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
}

main();
