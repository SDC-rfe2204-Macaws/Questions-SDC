const answersModel = require('../../Database/Models/answers');

module.exports = {
  get: function (req, res) {
    let question_id = req.params.question_id;
    let {page, count} = req.query;
    answersModel.get(question_id, page, count )
    .then((results) => {
      res.send(results)
    })
  },
  post: function (req, res) {
    answersModel.post(req.body, req.params.question_id)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      res.send(err)
    })
  },
  putHelpful: function (req, res) {
    answersModel.putHelpful(req.params.answer_id).then(() => {
      res.sendStatus(204)
    }).catch((err) => {
      res.send(err);
    })

  },
  putReport: function (req, res) {
    answersModel.putReport(req.params.answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err);
    })

  }
}



