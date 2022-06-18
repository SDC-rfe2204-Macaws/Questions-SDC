require("dotenv").config();
const path = require('path');
const { Pool } = require('pg');

// create an instance
const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  max: 25,
})

// connect to the instance and
pool.connect()
  .then((res) => console.log("* successfully connected to postgres *"))
  .catch((err) => console.log(err.message))


pool.query(`DROP TABLE IF EXISTS questions`)
  .then(() => {
    console.log('1. QUESTION TABLE DROPPED')
    pool.query(`CREATE TABLE questions(
        id integer NOT NULL,
        product_id integer,
        body text,
        date_written text,
        asker_name text,
        asker_email text,
        reported smallint,
        helpful integer,
        PRIMARY KEY (id))`)
      .then(success => {
        console.log('2. CREATE TABLE QUESTIONS')
        pool.query(`COPY questions FROM '${path.join(__dirname, 'questions.csv')}' DELIMITER ',' CSV HEADER;`)
          .then(() => {
            console.log('3. imported questions.csv');
          })
          .then(() => {
            pool.query(`ALTER TABLE questions
            RENAME COLUMN body TO question_body`)
            pool.query(`ALTER TABLE questions
            RENAME COLUMN date_written TO question_date`)
            pool.query(`ALTER TABLE questions
            RENAME COLUMN helpful TO question_helpfulness`)
          })
          .then(() => {
            pool.query(`create index questions_product_id on questions(product_id)`);
            console.log('4. Created index on product_id')
          })

          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err);
      });

  })
  .catch((err) => {
    console.log(err);
  })


pool.query(`DROP TABLE IF EXISTS answers`)
  .then(() => {
    console.log(' 1. Answers TABLE DROPPED')
    pool.query(`CREATE TABLE answers
    (
        id integer NOT NULL,
        question_id integer,
        body text,
        date_written text,
        answer_name text,
        answerer_email text,
        reported smallint,
        helpful integer,
        PRIMARY KEY (id)
    )`)
      .then(success => {
        console.log(' 2. CREATE TABLE answers')
        pool.query(`COPY answers FROM '${path.join(__dirname, 'answers.csv')}' DELIMITER ',' CSV HEADER;`)
          .then(() => {
            console.log(' 3. imported answers.csv');
            pool.query(`ALTER TABLE answers
            ADD FOREIGN KEY (question_id) REFERENCES questions(id)`);
          })
          .then(() => {
            pool.query(`ALTER TABLE answers
            RENAME COLUMN reported TO answers_reported`);
          })
          .then(() => {
            pool.query(`create index answers_question_id on answers(question_id)`);
            console.log(' 4. Created index on answers.question_id')
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err);
      });

  })
  .catch((err) => {
    console.log(err);
  })


pool.query(`DROP TABLE IF EXISTS answers_photos`)
  .then(() => {
    console.log('   1. answers_photos TABLE DROPPED')
    pool.query(`CREATE TABLE answers_photos
    (
      id integer NOT NULL,
      answer_id integer,
      url text,
      PRIMARY KEY (id)
    )`)
      .then(success => {
        console.log('   2. CREATE TABLE Answers_photos')
        pool.query(`COPY answers_photos FROM '${path.join(__dirname, 'answers_photos.csv')}' DELIMITER ',' CSV HEADER;`)
          .then(() => {
            console.log('   3. imported answers_photos.csv');
            pool.query(`ALTER TABLE answers_photos
            ADD FOREIGN KEY (answer_id) REFERENCES answers(id)`)
          })
          .then(() => {
            pool.query(`create index answers_photos_answer_id on answers_photos(answer_id);`);
            console.log('   4. Created index on answers_photos.answer_id ')
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  })



module.exports = pool;