const express = require('express')
//const db = require('./Database/ETL_postgres.js')
const app = express();
const PORT = 3000;


app.use(express.json());
//app.use(express.urlencoded({extended: true}))


const questionsController = require('./Server/routes');
app.use('/qa/questions', questionsController);


const answersController = require('./Server/routes');
app.use('/qa/questions/:question_id', () => {
  console.log('hit')
});




app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
})