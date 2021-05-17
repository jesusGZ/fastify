const fastify = require("fastify");
const server = fastify();

server.register(require("fastify-cookie"), {
  secret: "mysecret",
  parseOptions: {},
});

server.register(require("fastify-helmet"));

server.register(require("fastify-cors"), {
  methods: ["GET", "PUT", "POST", "DELETE"],
  origin: false,
});

server.register(require("./routes.js"), { prefix: "/api" });

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Fastify corriendo en el puerto 3000");
});