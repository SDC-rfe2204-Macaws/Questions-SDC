require('newrelic');
const express = require('express')
const db = require('../Database/pgDatabase.js')

const app = express();
const PORT = 3000;

app.get('/qa/questions', (req, res) => {

  const SQL_QUERY = `
  SELECT JSON_AGG(row_to_json(t)) AS results
  FROM(
  SELECT question_id, question_body,
   question_date, asker_name,
   question_helpfulness, questions.reported,
   JSON_BUILD_OBJECT(answers.id, JSON_BUILD_OBJECT(
  'id',answers.id,
  'body', answers.body,
  'date', answers.date_written,
  'answerer_name', answers.answer_name,
  'photos', (SELECT json_agg(json_build_object(
            'url', url
          ))
          FROM answers_photos
          WHERE answer_id = answers.id))) AS answers
   FROM questions
   INNER JOIN answers
    ON questions.id = answers.question_id
   WHERE product_id  = $1
  ) AS t;`

  //  deconstruct the query property
  let { product_id, page, count } = req.query;
  console.log(product_id, page, count);
  //  initialize the object to return
  let data = { product_id: product_id, results: [] }

  //  if the product id is not an integer send it back with an error
  //  indicating that the wrong type of product id was sent
  if (isNaN(product_id)) {
    res.status(422);
    res.send('Error: Invalid data type for product_id');
    return;
  }

  db.query(SQL_QUERY, [ product_id])
  .then((data) => {
     data.rows[0]['product_id'] = product_id;
     const obj = data.rows[0];
     console.log(obj);
    return res.send(obj)
  })
  .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
})