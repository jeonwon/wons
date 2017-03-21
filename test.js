const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-Cookies': ['breakfast=toast', 'dinner=chicken']
  });
  response.end('<h1>Hello World....!</h1>');
}).listen(3000, () => {
  console.log('Server Running at localhost');
});