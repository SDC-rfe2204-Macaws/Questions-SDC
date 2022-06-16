const express = require('express');
const router = express.Router();
const questionModel = require('../Model/Questions.model.js');

router.get('/:product_id', (req, res, next) => {
  const { product_id } = req.params;
  console.log(product_id)
  questionModel.get(product_id).then((data) => {
    res.send(data);
  });
});

router.post('/', (req, res, next) => {
  questionModel.post(req.body).then((data) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      res.send(err);
    })
});

router.put('/:question_id/helpful', (req, res) => {
  questionModel.putHelpful(req.params.question_id).then(() => {
    res.sendStatus(204);
  })
});

router.put('/:question_id/report', (req, res) => {
  questionModel.putReported(req.params.question_id).then(() => {
    res.sendStatus(204);
  })
});

module.exports = router;