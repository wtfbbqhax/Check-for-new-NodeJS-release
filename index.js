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
        //jsdom.env({ html: body, scripts: [ "https://code.jquery.com/jquery-1.11.3.min.js" ] },
        var parse = jsdom.jsdom;
        var doc = parse(body);

        console.log(doc.querySelector('.version').innerHTML);
//        console.log(doc.documentElement.outerHTML);
//        var p = doc.getElementById("version");
//
//        console.log(p);
        /*
                function(err, window) {
                    var $ = window.jQuery;
                    console.log($('body').html());
                });
                */
    });
}).end();
