const questionModel = require('../../Database/Models/questions');

module.exports = {
  get: function (req, res) {
    const { product_id } = req.params;
    questionModel.get(product_id).then((data) => {
      res.send(data);
    });
  },
  post: function (req, res) {
    questionModel.post(req.body)
    .then((data) => {
      res.sendStatus(201)
    })
      .catch((err) => {
        res.send(err);
      })
  },
  putHelpful: function (req, res) {
    questionModel.putHelpful(req.params.question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err);
    })
  },
  putReport: function (req, res) {
    questionModel.putReport(req.params.question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err);
    })
  }
}


