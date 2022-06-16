const express = require('express')
//const db = require('./Database/ETL_postgres.js')
const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))


const QuestionRoute = require('./Routes/Question.route.js');

app.use('/qa/questions', QuestionRoute);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handler
/* app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
}) */

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
})