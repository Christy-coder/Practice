//this requires pool from postgres package
const { Pool } = require('pg');

//this is the URI for an elephantsql database
const URI = 'postgres://kxmgrkqv:ympUZ5ey8wWoRyaFDMqGILQHWQLvidsM@lallah.db.elephantsql.com:5432/kxmgrkqv';

//create a new pool with the uri
const pool = new Pool ({
 connectionString: URI,
})

//set up the query 
//accepts text, values, and callback
//runs the query on the pool passin in text, values, cb
const query = (text, values, callback) => {
  return pool.query(text, values, callback);
}

//export query
//module.exports can be an object
module.exports = query;

