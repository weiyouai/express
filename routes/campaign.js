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
//查
router.get('/list',filter.authorize,function(req, res, next) {
    connection.query('SELECT id,name,status,date,creator FROM campaign', function(err, rows, fields) {
        if (err) throw err;
        res.send(200,{totalCount:rows.length,list:rows});
    });
});
//增
router.post('/add',filter.authorize, function(req, res, next) {
    var name = req.body.name;
    var query = 'INSERT INTO campaign (name,creator) VALUES ("'+name+'","")';
    connection.query(query, function(err, rows, fields) {
        if (err) {
            res.send(300,{status:300,msg:'数据库报错'});
            throw err;
        }
        res.send(200,{status:200,msg:'添加数据成功'});
    });
});
//改
router.post('/update',filter.authorize, function(req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    var query = 'UPDATE campaign SET name="'+name+'" WHERE id='+id;
    connection.query(query, function(err, rows, fields) {
        if (err) {
            res.send(300,{status:300,msg:'数据库报错'});
            throw err;
        }
        res.send(200,{status:200,msg:'修改数据成功'});
    });
});
//修改状态
router.post('/updateStatus',filter.authorize, function(req, res, next) {
    var id = req.body.id;
    var status = req.body.status;
    var query = 'UPDATE campaign SET status="'+status+'" WHERE id='+id;
    connection.query(query, function(err, rows, fields) {
        if (err) {
            res.send(300,{status:300,msg:'数据库报错'});
            throw err;
        }
        res.send(200,{status:200,msg:'修改数据成功'});
    });
});
//删【物理删除】
router.post('/updateStatus',filter.authorize,function(req, res, next) {
    var id = req.body.id;
    var query = 'UPDATE campaign SET deleted=1 WHERE id='+id;
    connection.query(query, function(err, rows, fields) {
        if (err) {
            res.send(300,{status:300,msg:'数据库报错'});
            throw err;
        }
        res.send(200,{status:200,msg:'数据删除成功'});
    });
});

module.exports = router;
