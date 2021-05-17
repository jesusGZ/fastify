/* Serialization es el proceso que utiliza Fastify para dar forma al body que se retorna al usuario cuando se utiliza reply.send, 
al igual que en las validaciones, dentro de schema se puede definir el schema de el response que se le va a entregar al usuario 
dependiendo del código de respuesta, la manipulación de la serialización puede ayudarnos a evitar que se envien datos innecesarios. */

const fastify = require("fastify");
const server = fastify({logger: {level: "warn",prettyPrint: true}});

server.post("/book", {
  schema: {
    body: {
      type: "object",
      required: ["name", "author", "release"],
      properties: {
        name: { type: "string" },
        author: { type: "string" },
        release: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
          author: { type: "string" },
        },
      },
    },
  },
  handler: (request, reply) => {
    const { name, author, release } = request.body;
    reply.send({
      name: `El libro se llama ${name}`,
      author: `El autor se llama ${author}`,
      release: `Fue publicado en la fecha ${release}`,
      editorial: "Editorial desconocida",
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