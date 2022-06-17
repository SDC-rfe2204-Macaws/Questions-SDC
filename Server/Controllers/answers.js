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
    console.log(req.body, req.query)
    answersModel.post(req.body, req.query.question_id);
  },
  putHelpful: (req, res) => {

  },
  putReported: (req, res) => {

  }
}



