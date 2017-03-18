var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '620507',
  database : 'jws'
});

connection.connect();
/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

*/


var sql = 'SELECT * FROM topic';
connection.query(sql, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    for (var i=0; i<rows.length; i++){
      console.log(rows[i].title+"와"+rows[i].author);
    }
  }
});
connection.end();
