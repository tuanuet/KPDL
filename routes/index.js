var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
let connect = require('../lib/mysql.js');
let _ = require('lodash')
const tableName = 'new';
let skLearnAssignments = require('../data/sklearn/assignments.json')


let getNewFromIds = (tableName,ids) => {
  return new Promise((resolve,reject) => {

    var myQuery = 'SELECT * FROM ?? where id IN (?)';
    connect.query(myQuery, [ tableName, ids ], function (err,result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  })
}

let getNewsFromIdGroups = (tableName,ids) => {
  return new Promise((resolve,reject) => {
    var myQuery = 'SELECT * FROM ?? where id IN (?)';
    connect.query(myQuery, [ tableName, ids ], function (err,result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  })
}

let getNewsFromGroups = (tableName,ids) => {
  return new Promise((resolve,reject) => {
    var myQuery = 'SELECT * FROM ??';
    connect.query(myQuery, [ tableName ], function (err,result) {
      if (err) {
        reject(err);
      }
      let data = _(result).at(ids).value();
      resolve(data);
    });
  })
}

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

router.post('/analyze',async (req,res) => {
    try {
        console.log(req.body);
        let arrayId = [20,30,41,23,55,90,11,67,91,100]
        let news = await getNewFromIds(tableName,arrayId);
        res.json(JSON.stringify(news))
    } catch (e) {
        console.log(e);
    }

});

router.get('/news/:group',async (req,res) => {
    try {

        let arrayId = skLearnAssignments[parseInt(req.params.group)]
        let news = await getNewsFromGroups(tableName,arrayId);
        res.render('news',{
          title: 'Hệ thống phân loại bài báo',
          news
        })
    } catch (e) {
        console.log(e);
    }

});

module.exports = router;
