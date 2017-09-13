var express = require('express');
var router = express.Router();
var filter = require('../public/util/filter');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'weiyouai',
    database : 'wxc'
});

//获取列表
router.post('/getList', filter.authorize, function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    //connection.connect();
    var query = 'SELECT userName FROM user';
    connection.query(query, function(err, rows, fields) {
        if (err) {
            res.send(300,{status:300,msg:'数据库查询报错'});
            throw err;
        }
        console.log(rows);
        res.send(200,{status:200,list:rows});
    });
    //connection.end();
});

module.exports = router;
