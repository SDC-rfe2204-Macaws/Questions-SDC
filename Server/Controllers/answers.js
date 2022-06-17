const answersModel = require('../../Database/Models/answers');

module.exports = {
  get: function (req, res) {
    console.log(req.params)
    console.log(req.query)
  },
  post: function (req, res) {
    console.log(req.body)
    console.log(req.params)
  },
  putHelpful: (req, res) => {

  },
  putReported: (req, res) => {

  }
}



