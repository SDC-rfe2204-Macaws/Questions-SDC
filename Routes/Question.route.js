const express = require('express');
const router = express.Router();

router.get('/:product_id', (req, res, next) => {
  next(new Error("cannot get a list of all questions"))
  //res.send('getting a list of questions that are not reported')

});

router.post('/', (req, res) => {
  res.send('added question to db')
});

router.put('/:question_id/helpful', (req, res) => {
  res.send('marked question as helpful')
});

router.put('/:question_id/report', (req, res) => {
  res.send('marked question as reported')
});

module.exports = router;