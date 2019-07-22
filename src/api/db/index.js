import Knex from 'knex';
import { db as connection, queryLog } from "../../config";

class DbKnex {

  constructor(knexConfig) {
    this._knex = Knex(knexConfig);
  }

  /**
   * 
   */
  log() {
    let { _knex: knex } = this;
    console.log(`- ${connection.database} db: Query log enabled`);
    knex.on('query', data => {
      console.log('======== on query ==========');
      let i = 0;
      let sql = data.sql.replace(/\?/g, k => {
        return '"' + data.bindings[i++] + '"';
      });
      console.log(sql);
      console.log('==================');
    });
  }

  /**
   * 
   */
  get knex() {
    return this._knex
  }
}

let dbKnex = new DbKnex({
  client: 'mysql',
  connection
});
if (queryLog) {
  dbKnex.log();
}

export default dbKnex.knex;