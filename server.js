var express = require('express');
var app = express();
var path = require('path');
// app.use(express.static(path.join(__dirname,'public')));

var handler = require('./request-handler');



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/login', handler.loginForm);
app.post('login', handler.loginUser);

app.get('/logout', handler.logoutUser);



app.listen(3000, function () {
  console.log('Tephra listening on port 3000!');
});