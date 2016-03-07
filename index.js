var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var Vision = require('vision')

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

// Plugin to server static files.
server.register(Inert, function (err) {
  if (err) throw err
})

// Plugin for rendering templates
server.register(Vision, function (err) {
  if (err) throw err
})

// NOTE: Query parameters get automatically parsed and not declared
// in the route path
server.route({
  method: 'GET',
  path: '/',
  // Define template to be used to generate response.
  handler: {
    view: "index.html"
  }
})

// This is used to configure templates used on the server.
server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'templates'),
  helpersPath: Path.join(__dirname, 'helpers')
})

server.start(function () {
  console.log('server running at: ', server.info.uri)
})
