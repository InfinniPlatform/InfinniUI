var express = require('express');
var http = require('http');
var app = express();
var port = 8181;

app.use(express.static( __dirname +  '/'));
http.createServer(app).listen(port, function () {
    console.log('Start listening at port %d', port);

    var open = require('open');
    open('http://localhost:' + port + '/launchers/main/#/Warehouse');
});


