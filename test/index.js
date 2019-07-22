import express from 'express';
import cors from "cors";
import path from "path";
import ApiAccess from '../src/ApiAccess';
const PORT = process.env.PORT || 4400;

const main = () => {
  let app = express();
  app.use(cors());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  let buildPath = path.join(__dirname, '../frontend/build');
  app.use('/', express.static(buildPath));
  let api = new ApiAccess();
  app.use('/api', api.app);
  let server = app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
  api.chatInit(server);
}

main();