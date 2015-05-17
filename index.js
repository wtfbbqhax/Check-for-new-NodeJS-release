#!/usr/bin/env node

// Check for new version of NodeJS.
// - Victor J. Roemer, <victor@badsec.org>
// - May 17, 2015

var http = require('https');
var jsdom = require('jsdom').jsdom;

// Taken from StackOverflow
// http://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number#answer-6832706
// return(s): 
//       1: |a| > |b|
//      -1: |a| < |b|
//       0: |a| = |b|
var version_compare = function(a,b) {
    if ( a === b ) { return 0; }

    var a_pts = a.split('.');
    var b_pts = b.split('.');
    var len = Math.min(a_pts.length, b_pts.length);

    for ( var i = 0; i < len; i++ ) {
      if ( parseInt(a_pts[i]) > parseInt(b_pts[i]) ) { return  1; }
      if ( parseInt(a_pts[i]) < parseInt(b_pts[i]) ) { return -1; }
    }

    if ( a_pts.length > b_pts.length ) { return  1; }
    if ( a_pts.length < b_pts.length ) { return -1; }
    return 0;
}

http.request({ host: 'nodejs.org', path: '/' }, function(resp) {
    var body = '';
    resp.on('data', function(chunk) { body += chunk; });
    resp.on('end', function() {  
        var str = jsdom(body).querySelector('.version') .innerHTML;

        var curr = str.replace( /Current Version:\s*v/, '' );
        var inst = process.version.replace(/^v/, '');
    
        if ( version_compare(curr, inst) == 1 ) {
            console.log("A new version of NodeJS is available!");
            console.log("http://nodejs.org/dist/v" + curr + "/node-v" + curr + ".tar.gz");
        }
    });
}).end();
