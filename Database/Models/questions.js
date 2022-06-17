const {pool} = require('../index.js');


const get = function (product_id) {
  return pool.query(
    `SELECT array_to_json(
            array_agg(
              json_build_object(
                'question_id', q.id,
                'question_body', q.question_body,
                ' question_date', q.question_date,
                 'question_reported', q.reported,
               'question_helpful', q.question_helpfulness,
'answers', (SELECT json_object_agg(
  a.id, json_build_object(
        'body', a.body,
        'date', a.date_written,
        'answerer_name', a.answer_name,
        'reported', a.answers_reported,
        'helpfulness', a.helpful,
        'photos', ( SELECT
                  array_to_json(
                  array_agg(
                  json_build_object(
                  'id', p.id,
                  'url', p.url
          )
      )
    )
    FROM answers_photos p
    WHERE a.id = p.answer_id
  )
 )
)
FROM answers a
WHERE q.id = a.question_id
AND a.answers_reported = 0
)
  )
  )
  )
FROM questions q
WHERE q.product_id = $1
AND q.reported = 0`, [product_id])
    .then((results) => {
      var questions =
      {
        product_id,
        results: results.rows[0].array_to_json
      }
      return questions;
    })
}
const post = function (body) {
  var date_written = new Date().getTime();
  body.question_body = body.question_body.replace(/'/g, "''");
  var lastId = pool.query(`select max(id) from questions`)
   return lastId.then((lastId) => {
   return pool.query(`
   INSERT INTO questions
        (id, product_id,
           question_body,
            question_date,
             asker_name,
        asker_email,
         reported,
          question_helpfulness )
        VALUES
        (${lastId.rows[0].max + 1}, ${body.product_id}, '${body.question_body}', '${date_written}',
        '${body.asker_name}', '${body.asker_email}', 0, 0)`)
  })

}

const putHelpful = function(question_id) {
  return pool.query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1
  WHERE id = ${question_id}`)
}

const putReported = function(question_id) {
  return pool.query(`UPDATE questions SET reported = 1
  WHERE id = ${question_id}`)
}



module.exports = {
  get: get,
  post: post,
  putHelpful: putHelpful,
  putReported: putReported
};