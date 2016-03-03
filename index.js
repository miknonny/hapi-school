var Hapi = require('hapi');
var Inert = require('inert');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

// Plugin to server static files.
server.register(Inert, function (err) {
  if (err) throw err
})
server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: __dirname + '/public/index.html'
  }
})

server.start(function () {
  console.log('server running at: ', server.info.uri)
})
