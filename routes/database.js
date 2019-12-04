var express = require('express');
var router = express.Router();
var databaseFunctions = require('../model/databaseFunctions')

router.get('/', function(req, res, next) {
    res.render('database', { title: 'Database' });
  });

  router.post('/create', function(req, res, next) {
      //databaseFunctions.databaseFunctions();
      databaseFunctions.databaseFunctionsPromises();

      console.log("Database oprettet")
    res.render('database', { title: 'Database' });
  });

  router.post('/append', async function(req, res, next) {
    //databaseFunctions.databaseFunctions();
    let result = await databaseFunctions.appendTable();
    console.log(result);

    console.log("Database oprettet")
  res.render('database', { data: result[0] });
});


        

        module.exports = router;