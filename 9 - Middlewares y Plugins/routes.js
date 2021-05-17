async function myRoutes(fastify, options) {
    fastify.decorateRequest("token", "");
  
    const validateToken = (token) =>
      new Promise((resolve, reject) => {
        if (token) {
          resolve();
        } else {
          reject();
        }
      });
  
    fastify.addHook("preHandler", async (request, reply) => {
      try {
        const token = request.headers["authorization"];
  
        await validateToken(token);
        request.token = token;
        return;
      } catch (err) {
        reply.code(401).send({message: "No autorizado"});
      }
    });
  
    fastify.get("/", (request, reply) => {
      reply.send({
        message: "Fastify works",
        token: request.token,
      });
    });
  
    fastify.get("/books", (request, reply) => {
      const books = ["El laberinto de la soledad","Rebelión en la granja","100 años de soledad"];
  
      const { filtro } = request.query;
  
      const filteredBooks = books.filter((book) => book.includes(filtro));
  
      reply.send(filteredBooks);
    });
  
    fastify.get("/book/:id", (request, reply) => {
      const { id } = request.params;
  
      reply.send({message: `Estas buscando el libro ${id}`,});
    });
  
    fastify.post("/book", (request, reply) => {
      const { name, author } = request.body;
  
      reply.send({
        name: `El libro se llama ${name}`,
        author: `El autor se llama ${author}`,
      });
    });
  
    fastify.put("/book/:id", (request, reply) => {
      const { id } = request.params;
  
      const { name, author } = request.body;
  
      reply.send({
        message: `El registro con id ${id} será actualizado`,
        name: `El libro ahora se llama ${name}`,
        author: `El autor ahora se llama ${author}`,
      });
    });
  
    fastify.delete("/book/:id", (request, reply) => {
      const { id } = request.params;
  
      reply.send({
        message: `Se elimanará el libro con id ${id}`,
      });
    });
  }
  
  module.exports = myRoutes;