require("dotenv").config();
const { Pool } = require('pg');

// create an instance
module.exports = {
  pool:
    new Pool({
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      "max?": 25,
    }),
  poolConnect: function() {
    this.pool.connect()
      .then((res) => console.log("* successfully connected to postgres *"))
      .catch((err) => console.log(err.message))
  }
}



