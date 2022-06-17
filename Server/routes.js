const controllerQuestions = require('./Controllers/questions');
const controllerAnswers = require('./Controllers/answers');
const router = require('express').Router();


// question routes
router.get('/questions/:product_id', controllerQuestions.get);

router.post('/questions/', controllerQuestions.post);

router.put('/questions/:question_id/helpful', controllerQuestions.putHelpful);

router.put('/questions/:question_id/report', controllerQuestions.putReported);

// answers routes
router.route('/questions/:question_id/answers')
.get((req, res) => {
  controllerAnswers.get(req, res);
})
.post((req, res) => {
  console.log("in routes", req.query)
  controllerAnswers.post(req, res);
})

router.put('/answers/:answer_id/helpful', () => {
  console.log('hit helpful put!')
})

router.put('/answers/:answer_id/report', () => {
  console.log('hit report put!')
})


module.exports = router;