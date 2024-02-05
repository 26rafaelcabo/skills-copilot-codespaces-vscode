// Create web server 
var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

var server = http.createServer(function(req, res) {
    // Get the path of the request
    var parsedUrl = url.parse(req.url, true);
    var pathWithQuery = req.url;
    var queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
    }
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;
    var method = req.method;

    // If the path is /index.html
    if (path === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        // Read the file and respond with the content
        var string = fs.readFileSync('./index.html', 'utf8');
        var page1 = fs.readFileSync('./page1.html', 'utf8');
        res.write(string);
        res.end();
    } else if (path === '/page1.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.write(page1);
        res.end();
    } else if (path === '/style.css') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css;charset=utf-8');
        var string = fs.readFileSync('./style.css', 'utf8');
        res.write(string);
        res.end();
    } else if (path === '/main.js') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript;charset=utf-8');
        var string = fs.readFileSync('./main.js', 'utf8');
        res.write(string);
        res.end();
    } else if (path === '/comments') {
        if (method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.write(JSON.stringify(comments));
            res.end();
        } else if (method === 'POST') {
            res.setHeader('Content-Type', 'text/plain;charset=utf-8');
            var comment = query.comment;
            comments.push(comment);
            res.write('success');
            res.end();
        }
    } else {
        res.statusCode = 404;
        res
