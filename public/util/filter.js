var redis = require("redis");
//var client = redis.createClient();
//过滤器
exports.authorize = function(req, res, next) {
    var token = req.cookies.token;
    if(!token){
        res.status(401).send('you are not login!');
    }
    next();
}
