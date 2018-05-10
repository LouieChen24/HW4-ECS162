// "Hello world" server

// like include
var http  = require('http');
var node = require('node-static');
var fileServer = new node.Server('./public');

// like a callback
function searchBooks (request, response) {
    var url = request.url;
	console.log(url);
	if(url.split("/")[1] == "query")
	{
		console.log(url);
		url = url.replace("/","");
		console.log(url);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<h1>Hello!</h1>");
		response.write("<p>You asked for <code>" + url.split("/")[1] + "</code></p>");
		response.end();
	}
	else
	{
		request.addListener('end', function () {
			fileServer.serve(request, response, function (e, res) {
				if (e && (e.status === 404)) { // If the file wasn't found
					fileServer.serveFile('/not-found.html', 404, {}, request, response);
				}
			});
		}).resume();
	}
	
}
//dafhafhaifai

var finder = http.createServer(searchBooks);

// fill in YOUR port number!
finder.listen("51858");