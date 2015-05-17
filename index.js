#!/usr/bin/env node

// Check for new version of NodeJS.
// - Victor J. Roemer, <victor@badsec.org>
// - May 17, 2015

var http = require('https');
var jsdom = require('jsdom');

// Taken from StackOverflow
// http://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number#answer-6832706
var version_compare = function(a,b) {
    if (a === b) {
        return 0;
    }

    var a_pts = a.split(".");
    var b_pts = b.split(".");

    var len = Math.min(a_pts.length, b_pts.length);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_pts[i]) > parseInt(b_pts[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_pts[i]) < parseInt(b_pts[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_pts.length > b_pts.length) {
        return 1;
    }

    if (a_pts.length < b_pts.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
}

http.request({ host: 'nodejs.org', path: '/' }, function(resp) {
    var body = '';

    resp.on('data', function(chunk) {
        body += chunk;
    });

    resp.on('end', function() {  
        var parse = jsdom.jsdom;
        var doc = parse(body);

        var str = doc.querySelector('.version').innerHTML;
        var curr = str.replace( /Current Version:\s*v/, '' );
        var inst = process.version.replace('^v', '');
    
        var r = version_compare(curr, inst);

        if ( r == 1 ) {
            console.log("A newer version of NodeJS is available!");
            console.log("Current: " + curr + "\nInstall: " + inst );
        }
    });
}).end();
