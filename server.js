var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'build')))

var port = process.env.PORT || 8080
app.listen(port)
console.log(`server listening on port: ${port}`)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/ping', function (req, res) {
    return res.send('pong');
});