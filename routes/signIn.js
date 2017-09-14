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
router.get('/config',filter.authorize,function(req, res, next) {
    var campaignId = req.query.campaignId;
    connection.query('SELECT id,isRealName,successInfo,isCustom,customItems FROM signInConfig WHERE campaignId=' + campaignId, function(err, rows, fields) {
        if (err) throw err;
        if(rows&&rows.length&&rows[0]){
            res.send(200,{config:rows[0]});
        }else{
            res.send(200,{config:null,msg:'没有查到配置信息'});
        }
    });
});
//改
router.post('/update',filter.authorize, function(req, res, next) {
    var id = req.body.id;
    var isRealName = req.body.isRealName;
    var successInfo = req.body.successInfo;
    var isCustom = req.body.isCustom;
    var customItems = req.body.customItems;
    var index = 1;
    for(var i=0;i<customItems.length;i++){
        var itemId = customItems[i].itemId;
        if(itemId && itemId>index){
            index = customItems[i].itemId;
        }
    }
    for(var i=0;i<customItems.length;i++){
        var itemId = customItems[i].itemId;
        if(!itemId){
            index = index + 1;
            customItems[i].itemId = index;
        }
    }
    customItems = JSON.stringify(customItems);
    var query = 'UPDATE signInConfig SET isRealName=?,successInfo=?,isCustom=?,customItems=? WHERE id=?';
    connection.query(query, [isRealName,successInfo,isCustom,customItems,id],function(err, rows, fields) {
        if (err) {
            res.send(300,{status:300,msg:'数据库报错'});
            throw err;
        }
        res.send(200,{status:200,msg:'修改数据成功'});
    });
});

module.exports = router;
