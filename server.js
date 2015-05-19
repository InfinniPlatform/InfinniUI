var express = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('./server/cors');
var users = require('./server/users');
var app = express();
var port = 3000;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    users.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        process.nextTick(function () {
            users.findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (user.password != password) { return done(null, false); }
                return done(null, user);
            })
        });
    }
));


var router = express.Router();
router.route('/login')
    .get(function(req, res) {
        res.sendFile(__dirname + '/server/views/login.html');
    })
    .post(
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }),
        function(req, res) {
            users.findByUsername(req.param('username'), function (nop, user) {
                res.redirect(user.home);
            });
        }
    );



app.use(cors);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/server/*', forbidden);
app.use('/server.js', forbidden);

app.use(ensureAuthenticated, express.static( __dirname +  '/'));


app.listen(port);


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function forbidden (req, res) {
    res.sendStatus(403);
}