var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');

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
  path: '/foo/bar/baz/{filename}',
  handler: function (request, reply) {
    reply.file(Path.join(__dirname, '/public/' + request.params.filename))
  }
})

server.start(function () {
  console.log('server running at: ', server.info.uri)
})
