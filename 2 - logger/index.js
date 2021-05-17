const fastify = require("fastify");
/* fatal
error
warn
info (este es el default)
debug
trace */
const server = fastify({
  logger: {
    level: "warn",
    prettyPrint: true,
    file: "logs.log",
  },
});

server.get("/", function (request, reply) {
    request.log.warn("Soy un log warn");
    request.log.error("Soy un log error");
    reply.send({
      message: "Fastify works",
    });
  });

server.listen(3000, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});