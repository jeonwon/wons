var express = require('express');
var app = express();
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'wonbinj',
  password : 'wonbin0507',
  database : 'wonbinj'
});

connection.connect();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty=true;
app.set('view engine','jade');
app.set('views', './views');
app.use(express.static('publice'));

//router
app.get('/', function (req, res) {
  res.send('Hello World! this is won directory');
});

app.get('/form', function(req, res){
 res.render('form');
});

app.get('/form_receiver', function(req, res){
 var title=req.query.title;
 var description=req.query.description;
});

app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  connection.query(sql, function(err, rows, filds){
    if(err){
  console.log(err);
  }else{
      var id = req.params.id;
      if(id){
          var sql='select * FROM topic WHERE id=?';
          connection.query(sql, [id], function(err, rowss, filds){
            if(err){
              console.log(err);
              } else{
                res.render('view', {topics:rows, topic:rowss[0]});
              }
          });
        } else{
          res.render('view', {topics:rows});
              }
    }
  });
});
/*
app.get('/topic:id', function(req, res){
  var id = req.params.id;
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    fs.readFile('data/'+id, 'utf8', function(err, data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view', {topics:files, title:id, description:data});
    });
  });
});
*/
app.get('/add', function (req, res) {
  var sql = 'SELECT id, title FROM topic';
  connection.query(sql, function(err, rows, filds){
    if(err){
      console.log(err);
    }
    res.render('add', {topics:rows});
  });
});
/* Post방식
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      res.status(500).send('Internal Server Error');
    }
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
        }
      res.render('view', {topics:files});
    });
});
});
*/
app.post('/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO  topic (title, description, author) VALUE (?,?,?)';
  connection.query(sql, [title, description, author], function(err, rows, fields){
      if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
        }
      res.redirect('/topic/'+rows.insertId);
  });
});

app.post('/edit/', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.body.id;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  connection.query(sql, [title, description, author, id], function(err, rows, fields){
      if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
        }
      res.redirect('/topic/'+id);
  });
});

app.post('/delete', function(req, res){
  var id = req.body.id;
  var sql = 'DELETE FROM topic WHERE id=?';
  connection.query(sql, [id], function(err, rows, fields){
      if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
        }
      res.redirect('/topic/');
  });
});

app.listen(8001, function () {
  console.log('Example app listening on port 3000!');
});
