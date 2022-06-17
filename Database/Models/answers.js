const { pool } = require('../index.js')

const get = function (question_id, page, count = 5) {
  let offSet = page ? (page * count) - count : 0;
  page = page || 1;
  console.log(question_id, page, count);
  return pool.query(`SELECT array_to_json(
    array_agg(
      json_build_object(
        'answer_id', a.id,
        'body', a.body,
        'date', a.date_written,
        'answerer_name', a.answer_name,
        'photos', (SELECT
          array_to_json(
            array_agg(
              json_build_object(
                'id', p.id,
                'url', p.url
              )
            )
          )
          FROM answers_Photos p
          WHERE a.id = p.answer_id
          )
      )
    )
  )
  FROM answers a
  WHERE a.question_id = ${question_id}
  AND a.answers_reported = 0`)
    .then((data) => {
      var answers = {
        question: question_id,
        page,
        count
      }

      if (data.rows[0].array_to_json) {
        var cap = data.rows[0].array_to_json.slice(offSet, offSet + count);
        answers.results = cap;
      } else {
        answer.results = [];
      }
      return answers;
    })
};

const post = function (body, question_id) {
  var date_written = new Date().getTime();
  body.body = body.body.replace(/'/g, "''");
  var lastId = pool.query(`SELECT max(id) FROM answers`);
  return lastId.then((lastId, date_written) => {
    lastId = lastId.rows[0].max + 1
  return pool.query(`INSERT INTO answers
  (id,
  question_id,
  body,
  date_written,
  answer_name,
  answerer_email,
  answers_reported,
  helpful
   )
  VALUES
  (${lastId},
   ${question_id},
  '${body.body}',
   '${date_written}',
  '${body.answerer_name}',
  '${body.answerer_email}',
  0,
  0
  ) RETURNING id`)
  })

};

const putHelpful = function (answer_id) {
  return pool.query(`UPDATE answers
 SET helpful = helpful + 1
 WHERE id = ${answer_id}`)
};

const putReported = function (answer_id) {
  return pool.query(`
  UPDATE answers
  SET answers_reported = 1
  WHERE id = ${answer_id}`)
};


module.exports = {
  get: get,
  post: post,
  putHelpful: putHelpful,
  putReported: putReported
}