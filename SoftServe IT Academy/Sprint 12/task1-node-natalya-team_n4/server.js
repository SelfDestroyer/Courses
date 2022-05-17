import express from "express";

const app = express();
const PORT = 3000;
const interval = process.argv[3];
const time = process.argv[5];

app.get("/", (req, res) => {
  const showTime = setInterval(() => {
    console.log(
      `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    );
  }, interval);

  setTimeout(() => {
    clearInterval(showTime);

    res.send(
      `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    );
  }, time);
});

app.listen(PORT, () => {
  console.log("Starting");
  console.log(`Server was started on PORT ${PORT}`);
});
