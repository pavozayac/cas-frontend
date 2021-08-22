const { createServer } = require("http");
const app = require("../dist/assets/index.33b9c260.js");

createServer((req, res) => {
  const { html } = app.render({ url: req.url });

  res.write(`
    <!DOCTYPE html>
    <div id="app">${html}</div>
    <script src="/dist/bundle.js"></script>
  `);

  res.end();
}).listen(3000);