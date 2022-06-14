require("dotenv").config();
const {Pool} = require('pg')

// create an instance to
const instance = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  max: 25,
})

// connect to the instance and
instance.connect()
.then((res) => console.log("success"))
.catch((err) => console.log(err.message))



module.exports = instance;