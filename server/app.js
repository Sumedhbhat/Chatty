const http = require("http");

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({ msg: "Hello World" }));
});

server.listen(3000, () => {
  console.log("started server");
});
