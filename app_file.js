var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty=true;
app.set('view engine','jade');
app.set('views', './views_file');
app.use(express.static('publice'));

app.get('/', function (req, res){
  res.send('Hello World! this is won directory');
});

app.get('/topic/:id', function(req, res){
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


app.get('/topic/new', function(req, res){
  res.render('new');
});


app.get('/topic', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('view', {topics:files});
  });
});


app.get('/form', function(req, res){
 res.render('form');
});

//Post방식
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
