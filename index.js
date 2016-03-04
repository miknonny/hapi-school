var Hapi = require('hapi');
var H2o2 = require('h2o2')

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.register(H2o2, (err) => {
  if (err) throw err
})

// NOTE: Query parameters get automatically parsed and not declared
// in the route path
server.route({
  method: 'GET',
  path: '/proxy',
  // Define template to be used to generate response.
  handler: {
    proxy: {
      host: '127.0.0.1',
      port: 65535
    }
  }
})


server.start(function () {
  console.log('server running at: ', server.info.uri)
})
