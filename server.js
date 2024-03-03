const httpServer = require('http-server');
const port = 8080; // Adjust if needed

const server = httpServer.createServer();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

