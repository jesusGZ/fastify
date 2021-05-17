const fastify = require("fastify");

const server = fastify({
    logger: {
        level: "warn",prettyPrint: true
    }
});

server.post("/book", {
    schema: {
        body: {
            type: "object",
            required: ["name", "authors"],
            properties: {
                name: { type: "string" },
                authors: {
                    type: "array",
                    minItems: 1,
                    items: {
                        type: "object",
                        required: ["name", "surname"],
                        properties: {
                            name: { type: "string" },
                            surname: { type: "string" },
                        },
                    },
                },
            },
        },
    },
    handler: function (request, reply) {
        const { name, authors } = request.body;
        reply.send({
            name: `El libro se llama ${name}`, authors
        });
    },
});

server.listen(3000, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log("Fastify corriendo en el puerto 3000");
});