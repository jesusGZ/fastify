const fastify = require("fastify");

const server = fastify({
  logger: {
    level: "warn",
    prettyPrint: true,
  },
});

//  Con esta simple promesa vamos a validar que el token en cabecera sea "admin", caso contrario rechazamos la promesa
const validarToken = (token) =>
  new Promise((resolve, reject) => {
    if (token === "admin") {
      resolve();
    } else {
      reject();
    }
  });

//  Funcion que simula obtener datos de una base de datos
const obtenerDeBaseDeDatos = async (id) => {
  return {
    id,
    author: "Sun Tzu",
    name: "El arte de la guerra",
  };
};

server.get("/book/:id", {
  preHandler: async (request, reply) => {
    try {
      const { authorization } = request.headers;

      await validarToken(authorization);

      return;
    } catch (err) {
      request.log.warn(err);
    
      reply.code(401).send({error: "El usuario no esta autorizado"});
    }
  },
  handler: async (request, reply) => {
    const book = await obtenerDeBaseDeDatos(request.params.id);
    reply.send(book);
  },
});

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Fastify corriendo en el puerto 3000");
});