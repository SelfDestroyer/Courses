const { WebSocketServer, WebSocket } = require("ws");

const wss = new WebSocketServer({ port: 8082 });

wss.on("connection", (connection) => {
  connection.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(message.toString());
    });
  });
});

module.exports = wss;
