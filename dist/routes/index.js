'use strict';

var express = require('express');
var router = express.Router();

var _require = require('child_process'),
    exec = _require.exec;

/* GET home page. */


router.get('/', function (req, res, next) {
    exec('python ./helloworld.py', function (error, stdout, stderr) {
        if (error) {
            console.error('exec error: ' + error);
            return;
        }
        console.log('stdout: ' + stdout);
        var json = JSON.parse(stdout);
        json = json.map(function (item) {
            return item[0] * 2;
        });
        // res.json(json)
        res.render('index', { title: 'Hệ thống phân loại bài báo' });
    });
});

router.post('/analyze', function (req, res) {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
//# sourceMappingURL=index.js.map