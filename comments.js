// Create web server for comments

// Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var mime = require('mime');
var comments = require('./comments');

// Create web server
var server = http.createServer(function(request, response) {
    var method = request.method;
    var uri = url.parse(request.url, true);
    var pathname = uri.pathname;
    var query = uri.query;

    // GET /comments
    if (method === 'GET' && pathname === '/comments') {
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        response.end(JSON.stringify(comments.getComments()));
    }

    // POST /comments
    else if (method === 'POST' && pathname === '/comments') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var comment = qs.parse(body);
            comments.addComment(comment);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(comments.getComments()));
        });
    }

    // DELETE /comments
    else if (method === 'DELETE' && pathname === '/comments') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var comment = qs.parse(body);
            comments.removeComment(comment);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(comments.getComments()));
        });
    }

    // GET /index.html
    else if (method === 'GET' && pathname === '/index.html') {
        fs.readFile('index.html', function(error, data) {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(data);
        });
    }

    // GET /style.css
    else if (method === 'GET' && pathname === '/style.css') {
        fs.readFile('style.css', function(error, data) {
            response.writeHead(200, {
                'Content-Type': 'text/css'
            });
            response.end(data);
        });
    }

    // GET /comments.js
    else if (