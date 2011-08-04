var http = require('http'), fs = require('fs');

server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var output = fs.readFileSync('./client.html', 'utf8');
    res.end(output); 
});

server.listen(8080);
 
var io = require('socket.io').listen(server);
 
io.sockets.on('connection', function(client){
	client.on('message', function(msg){
	    client.broadcast.json.send({ message: '' + msg.message });
	    client.json.send({ message: '' + msg.message });
	});
});