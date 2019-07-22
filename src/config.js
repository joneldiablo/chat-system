require('dotenv').config();

export default {
  env: process.env.ENV,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  queryLog: typeof process.env.QUERY_LOG === 'undefined' ?
    false : process.env.QUERY_LOG.toLowerCase() == 'true',
  masterPath: process.env.MASTER_PATH,
  domain: process.env.DOMAIN,
  email: {
    support: process.env.EMAIL_SUPPORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_APP_PASSWORD,
    emailDebug: process.env.EMAIL_DEBUG
  },
  masterKey: process.env.MASTER_KEY || 'masterKey',
  salt: 10
}