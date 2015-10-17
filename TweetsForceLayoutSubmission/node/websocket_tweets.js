var ws = require("nodejs-websocket");
 
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("text", function (str) {
        var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
  })
 
        t.on('tweet', function (tweet) {
      console.log(JSON.stringify(tweet));
      console.log(',');
        conn.sendText(JSON.stringify(tweet))
    });

    t.on('error', function (err) {
      console.log('Oh no');
    });

    t.track('Teradata')
    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed");

    })
    }).listen(8002);
    

    
