var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
let connect = require('../lib/mysql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    exec('python ./helloworld.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        let json = JSON.parse(stdout);
        json = json.map(item => item[0]*2);
        // res.json(json)
        res.render('index', { title: 'Hệ thống phân loại bài báo' });
    });
});
let getNewFromIds = (id) => {
  return new Promise((resolve,reject) => {
    const tableName = 'news';
    var myQuery = 'SELECT * FROM ?? where id IN (?)';
    connect.query(myQuery, [ tableName, id ], function (err,result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  })
}
router.post('/analyze',async (req,res) => {
    try {
        console.log(req.body);
        let arrayId = [20,30,41,23,55,90,11,67,91,100]
        let news = await getNewFromIds(arrayId);
        res.json(JSON.stringify(news))
    } catch (e) {
        console.log(e);
    }

});

module.exports = router;
