const fastify = require("fastify");

const server = fastify();

server.get("/books", function (request, reply) {
    const books = ["El laberinto de la soledad","Rebelión en la granja","100 años de soledad"];
    const { filtro } = request.query;
    const filteredBooks = books.filter((book) => book.includes(filtro));
    reply.send(filteredBooks);
});

server.get("/book/:id", function (request, reply) {
    const { id } = request.params;
    reply.send({message: `Estas buscando el libro ${id}`});
});

server.post("/book", function (request, reply) {
    const { name, author } = request.body;
    reply.send({name: `El libro se llama ${name}`,author: `El autor se llama ${author}`});
});

server.put("/book/:id", function (request, reply) {
    const { id } = request.params;
    const { name, author } = request.body;
    reply.send({
        message: `El registro con id ${id} será actualizado`,
        name: `El libro ahora se llama ${name}`,
        author: `El autor ahora se llama ${author}`,
    });
});

server.delete("/book/:id", function (request, reply) {
    const { id } = request.params;
    reply.send({message: `Se elimanará el libro con id ${id}`});
});

server.listen(3000, function (err) {
    if (err) {
        console.error(err);
        process.exit(0);
    }
    console.log("Fastify corriendo en el puerto 3000");
});