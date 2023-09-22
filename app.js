//This is a NodeJs application class.

//lets import the http module from NodeJs.
//http is one of the core module provided by NodeJs for creating and seding request.

const http = require("http");

//import the requestHandler, which is basically a routes handler
const routesHandler = require('./routes');

// Lets create a server
// const server = http.createServer(routesHandler.handler);

const server = http.createServer(routesHandler.handler);

//On this port our server will listen for the incoming requests.
const port = 3000;
console.log(`Starting server on port : ${port}`)
server.listen(port);
