var ws = require("nodejs-websocket");
 
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("text", function (str) {
        var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: 'zfG0CF1fjDjBq0KrOcHluS8nb',
    consumer_secret: 'wS23qP9NOt59IQxRbN7HupH85ivoWCKEcgzOkvu2xUa8kASzjR',
    token: '2654058938-gQwiFGEuTdkl0qoOmS4rTE47GS2pbtPFVOrP5TM',
    token_secret: 'RJ290uBEpgriGYXwUOYhO6A1muwHSZrHWvOc4pmAqRfoD'
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
    

    
