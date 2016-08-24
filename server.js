var express = require( 'express' );
var app     = express();

// process.env.PORT lets the port be set by Heroku
var port    = process.env.PORT || 8080;
var ip      = process.env.IP;

app.use( express.static( __dirname ) );

// set the home page route
app.get( '/', function( req, res ) {
    res.render( 'index.html' );
});

app.listen( port, ip, function() {
    console.log( 'Server listening on ' + ip + ":" + port );
});