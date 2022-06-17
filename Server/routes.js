const controllerQuestions = require('./Controllers/questions');
const router = require('express').Router();


// question routes
router.get('/:product_id', controllerQuestions.get);

router.post('/', controllerQuestions.post);

router.put('/:question_id/helpful', controllerQuestions.putHelpful);

router.put('/:question_id/report', controllerQuestions.putReported);



module.exports = router;