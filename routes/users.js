var express = require('express');
var router = express.Router();
var filter = require('../public/util/filter');
var myGuid = require('../public/util/guid');
var redis = require("redis");
//var client = redis.createClient();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'weiyouai',
  database : 'wxc'
});
//connection.connect();
/* GET users listing. */
router.get('/test', filter.authorize,function(req, res, next) {
  connection.query('SELECT password FROM user WHERE userName="weiyouai"', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows[0]);
    console.log('The solution is: ', rows[0]);
  });
  //connection.end();
});

//登录
router.post('/login', function(req, res, next) {
  var userName = req.body.userName;
  var password = req.body.password;
  //connection.connect();
  var query = 'SELECT userName,userId FROM user WHERE userName="'+userName+'" AND password="'+password+'"';
  connection.query(query, function(err, rows, fields) {
    if (err) {
        res.send(300,{status:300,msg:'数据库查询报错'});
        throw err;
    }
    console.log(rows);
    if(rows&&rows.length&&rows[0]){
        var token = myGuid.newGUID();
        //client.set( token,rows[0] ,redis.print);
        //req.session[token] = rows[0].userName;
        res.cookie('token',token,{ httpOnly:true});//登录成功保存token
        res.send(200,{status:200,msg:'登录成功'});
    }else{
        res.send(200,{status:201,msg:'用户名或密码不存在'});
    }
  });
  //connection.end();
});

module.exports = router;
