
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



app.get('/', function(req, res) 
{
    res.render("index");
})

app.post('/surveys/process', function(req, res) 
{
    req.session.form_info = req.body;
    res.redirect('/result');
})

app.get('/result', function(req, res)
{
    console.log(req.body);
    res.render("results", {info: req.session.form_info});
})





app.listen(6789, function() {
 console.log("listening on port 6789");
});
