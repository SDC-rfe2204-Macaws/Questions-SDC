const questionModel = require('../../Database/Models/questions');

module.exports = {
  get: function (req, res) {
    const { product_id } = req.params;
    console.log(product_id)
    questionModel.get(product_id).then((data) => {
      res.send(data);
    });
  },
  post: function (req, res) {
    questionModel.post(req.body).then((data) => {
      res.sendStatus(201)
    })
      .catch((err) => {
        res.send(err);
      })
  },
  putHelpful: function (req, res) {
    questionModel.putHelpful(req.params.question_id).then(() => {
      res.sendStatus(204);
    })
  },
  putReported: function (req, res) {
    questionModel.putReported(req.params.question_id).then(() => {
      res.sendStatus(204);
    })
  }
}


