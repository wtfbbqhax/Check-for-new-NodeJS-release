#!/usr/bin/env node

// Check for new version of NodeJS.
// - Victor J. Roemer, <victor@badsec.org>
// - May 17, 2015

var http = require('https');
var jsdom = require('jsdom');

http.request({ host: 'nodejs.org', path: '/' }, function(resp) {
    var body = '';

    resp.on('data', function(chunk) {
        body += chunk;
    });

    resp.on('end', function() {  
        var parse = jsdom.jsdom;
        var doc = parse(body);
        console.log(doc.querySelector('.version').innerHTML);
    });
}).end();
