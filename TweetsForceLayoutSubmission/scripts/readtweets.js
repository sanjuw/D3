
// Global variables and objects
var t = [];

// Change the labels on the buttons
cfg = {w:640, h:480};
var f = new forceLayout("chart1", cfg);
var counter = 1;

// Web socket
var sockit = new WebSocket("ws://localhost:8002/");
sockit.onopen = function() {
	console.log("Opening Connection...")
    sockit.send(counter + " Hello");
	console.log("Sent message:" + counter + " Hello");
	counter++;
};
sockit.onmessage = function(event) {
    console.log("Received message:" + event.data);
    console.log("Here I am... ")
	t = JSON.parse(event.data);
    console.log(t);
    f.addNode(t.user.name);
};
