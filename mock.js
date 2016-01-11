var express = require('express');
var cors = require('cors');

var bodyParser   = require('body-parser');
var multer = require('multer');

var app = express();
var port = 8888;


var router = express.Router();

var nope = function (req) {
    return  {
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
        files: req.files
    };
};

router.route('/test')
    .options(cors())
    .get(cors(), function(req, res) {
        res.send(nope(req));
    })
    .post(cors(), function(req, res) {
        res.send(nope(req));
    });

router.route('/SystemConfig/Upload/configuration/uploadbinarycontent/')
    .options(cors())
    .post(cors(), function(req, res) {
        res.send(nope(req));
    });

app.options(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/'}));

app.use(router);
app.listen(port);

