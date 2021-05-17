/*
    NOTA: Este script va a causar error, el objetivo es que veas que la declaracion doble de un hook
    provocará un error en Fastify como lo indica la documentacion
*/

const fastify = require("fastify");
const server = fastify({logger: {level: "warn",prettyPrint: true}});

const getUserData = (token) =>
  new Promise((resolve, reject) => {
    if (token === "admin") {
      resolve({
        id: 1,
        name: "Juan",
        surname: "Perez",
      });
    } else {
      reject();
    }
  });

server.decorateRequest("user", "");

server.get("/books", {
  preHandler: async (request, reply) => {
    try {
      const token = request.headers["authorization"];

      console.log(token);

      const userData = await getUserData(token);

      request.user = userData.name;

      return;
    } catch (error) {
      return reply.code(400).send({ error: "No se pudo obtener datos del usuario" });
    }
  },
  handler: (request, reply) => {
    server.decorateRequest("user", "Nuevo nombre");

    reply.send({
      books: ["100 años de soledad", "La metamorfosis"],
      user: request.user,
    });
  },
});

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Fastify corriendo en el puerto 3000");
});