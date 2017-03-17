const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

// connect to the database and load models
require('./server/models').connect(config.dbUri);
//import Article from './server/modules/Article';
const Article = require('mongoose').model('Article');

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
//todo - commented out
//const authCheckMiddleware = require('./server/middleware/auth-check');
//app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
//const articleRoutes = require('./server/routes/articleroutes');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
//app.use('/article', articleRoutes);

app.post("/api/saved", function(req, res) {
  //(item.headline.main, item.pub_date, item.web_url, item.source
 //var newArticle = new Article(req.body);
 console.log("in axios post " + req.body);
 var title = req.headline.main;
 var date=  req.body.pub_date;
 var url =  req.body.web_url;
 var source =  req.body.source;
 var newArticle = new Article({title: title, date: date, url: url, source:source});

  console.log(req.body);

  newArticle.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// app.post('/api/saved',  function (req, res){

//   var newArticle = new Article({
//     title: req.body.title,
//     date: req.body.date,
//     url: req.body.url,
//     source : req.body.source,
//     user : req.body.user
//   });

//   newArticle.save((err, doc) => {
//     if(err){
//       console.log(err);
//       res.send(err);
//     } else {
//       res.json(doc);
//     }
//   });

// });

app.get("/api/saved", function(req, res) {

  Article.find({})
    .exec(function(err, doc) {

      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
