var express = require('express');
var router = express.Router();
var mainDB = require('../DAL/dbRepository')

router.post('/createQuestion', function (req, res) {
    console.log(req.body);
    mainDB.addQuestion(req.body, function (result, err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send();
        }
    });
});

router.get('/getQuestions/:field', function (req, res) {
    const field = req.params['field'];
    mainDB.getQuestions(field, function (result, err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

router.get('/tests', function (req, res, next) {
    mainDB.getTests(data => {
        res.json(data);
    })
});

module.exports = router;
