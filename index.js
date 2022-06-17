const express = require('express')
const route = require('./Server/routes');
//const db = require('./Database/ETL_postgres.js')
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/qa', route);
// use the ./Server/routes file to handle endpoints that start with /qa/questions

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
})