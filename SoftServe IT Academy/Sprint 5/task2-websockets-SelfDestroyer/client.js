const remoteUrl = "wss://boiling-beach-26008.herokuapp.com";
const localUrl = "ws://localhost:8082";

const client = new WebSocket(localUrl);

function send() {
  let userName = document.querySelector("#userName").value;
  let message = document.querySelector("#message").value;

  client.send(`${userName}: ${message}`);
}

client.onmessage = ({ data }) => {
  document.querySelector("#chat").innerHTML += `${data}\n`;
};
