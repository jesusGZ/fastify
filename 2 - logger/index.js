const fastify = require("fastify");
const server = fastify({
  logger: {
    level: "warn",
    prettyPrint: true,
    file: "logs.log",
  },
});

server.get("/", function (request, reply) {
    //  Se envia un log utilizando request con su propiedad log seguido del nivel de log que se quiere enviar
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