module.exports = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8181");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With, X-File-Type, X-File-Size');
    res.header("Access-Control-Allow-Credentials", true);
    next();
};
