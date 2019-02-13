var sql = require("mssql");
var config = require("./dbconfig");
var bcrypt = require('bcryptjs');

const dbPool = new sql.ConnectionPool(config, err => {
    if (err) {
        console.log('dbPool Error: ' + err);
    }
});

class DBContext {
    login(email, password, callback) {
        var request = dbPool.request();
        request.input('Email', sql.VarChar(50), email);
        request.execute('spAdmins_login').then(function (req, err) {
            if (bcrypt.compareSync(password, req.recordset[0].Password)) {
                callback(req.recordset[0].Email);
            } else {
                console.log("error", "Execution error calling 'spAdmins_login'");
                callback(null, { message: 'Failed connection' });
            }
        });
    }

    register(admin, callback) {
        var request = dbPool.request();
        var hashpassword = bcrypt.hashSync(admin.password, 10);
        console.log({ hashpassword });
        console.log(admin.password);
        request.input('Email', sql.VarChar(50), admin.email);
        request.input('FirstName', sql.VarChar(50), admin.firstName);
        request.input('LastName', sql.VarChar(50), admin.lastName);
        request.input('Password', sql.VarChar(50), hashpassword);
        request.input('IsActive', sql.Bit, false);
        request.input('OrganizationId', sql.Int, null);

        request.execute('spAdmins_Insert').then(function (req, err) {
            if (err) {
                callback(null, { message: 'Error occured while registeration' })
            } else {
                callback(req);
            }
        });
    }

    updatePassword(admin, callback) {
        var request = dbPool.request();
        var hashpassword = bcrypt.hashSync(admin.password, 10);
        request.input('Password', sql.VarChar(150), hashpassword);
        request.input('Email', sql.VarChar(50), admin.email);
        request.execute('spAdmins_UpdatePassword').then(function (req, err) {
            if (err) {
                callback(null, { message: 'Error occured while creation test' })
            } else {
                callback(req);
            }
        });

    }

    createTest(test, callback) {
        var request = dbPool.request();
        request.input('Language', sql.VarChar(50), test.language);
        request.input('TestName', sql.VarChar(50), test.name);
        request.input('Instructions', sql.VarChar(50), test.instructions);
        request.input('Time', sql.Int, test.time);
        request.input('OwnerEmail', sql.VarChar(50), test.ownerEmail);
        request.input('PassingGrade', sql.Int, test.passingGrade);
        request.input('ReviewAnswers', sql.Bit, test.reviewAnswers);
        request.input('LastUpdate', sql.Date, new Date());
        request.input('DiplomaURL', sql.VarChar(50), null);
        request.execute('spTests_Insert').then(function (req, err) {
            if (req) {
                callback(req.returnValue);
            } else if (err) {
                callback(null, { message: 'Error occured ' })
            }
        });
    }

    addQuestionsToTest(questions, testId, callback) {
        var request = dbPool.request();
        request.input('TestId', sql.Int, testId);
        for (let index = 0; index < questions.length; index++) {
            request.input('QuestionId', sql.Int, questions[index]);
            request.execute('spQuestionForTest_Insert').then(function (req, err) {
                if (req) {
                    console.log(req);
                    continue;
                } else if (err) {
                    console.log('zubidsadas');
                    callback(null, { message: 'Error occured ' })
                }
            });

        }
        callback(testId);
    }

    /**
     * Add question to db
     * @param {*response function} callback 
     */
    addQuestion(question, callback) {
        var request = dbPool.request();
        request.input('Title', sql.VarChar(50), question.Title);
        request.input('QuestionType', sql.VarChar(50), question.QuestionType);
        request.input('QuestionContent', sql.VarChar(50), question.QuestionContent);
        request.input('Active', sql.Bit, false);
        request.input('LastUpdate', sql.Date, question.LastUpdate);
        request.input('Field', sql.NVarChar(50), question.Field);

        request.execute('spQuestions_INSERT').then(function (req, err) {
            if (err) {
                callback(null, { message: "Execution error calling 'spQuestions_INSERT'" })
            } else {
                callback(req);
            }
        });
    }

    /**
     * Add answer to db
     * @param {*response function} callback 
     */
    addAnswer(answer, callback) {
        console.log('ans in repo: ' + answer.QuestionId);
        var request = dbPool.request();
        request.input('QuestionId', sql.Int, answer.QuestionId);
        request.input('CorrectAnswer', sql.Bit, answer.CorrectAnswer);
        request.input('Info', sql.VarChar(50), answer.Info);

        request.execute('spAnswers_Insert').then(function (req, err) {
            if (err) {
                callback(null, { message: "Execution error calling 'spAnswers_Insert'" })
            } else {
                console.log('add ans in db: ' + req);
                callback(req);
            }
        });
    }

    /**
     * get all questions
     * @param {*} callback 
     */
    getQuestions(field, callback) {
        console.log('in db repo ');
        console.log('field: ' + field);
        var req = dbPool.request();
        req.input('Field', sql.NVarChar(50), field);
        req.execute('spQuestions_GetByField').then(function (req, err) {
            if (err) {
                callback(null, { message: "Exec error calling 'spQuestions_GetAll'" })
            } else {
                callback(req.recordset);
            }
        });
    }

    /**
     * get all tests
     * @param {function to get result} callback 
     */
    getTests(callback) {
        var req = dbPool.request();

        req.execute("spTests_GetAll", (err, data) => {
            if (err) {
                throw new Error("Exec error calling 'spTests_GetAll'");
            }

            callback(data.recordset);
        });
    }
}

module.exports = new DBContext();
