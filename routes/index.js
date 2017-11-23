var express = require('express');
var router = express.Router();
const { exec } = require('child_process');

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

router.post('/analyze',(req,res) => {
    console.log(req.body);
    res.redirect('/')
});

module.exports = router;
