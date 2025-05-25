const express = require("express");
const cors = require("cors");
const http = require("http");
const { CronJob } = require("cron");
const https = require('https');

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");
const connection = require("./database/connection");

const app = express();
const server = http.createServer(app);

setupWebsocket(server, connection);

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const job = CronJob.from({
    cronTime: '*/15 * * * *',
    onTick: function () {
        console.log('This task runs every minute');
        https.get('https://reticketify-aoj95.onrender.com/event', (resp) => {
        let data = '';

        // Um bloco de dados foi recebido.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // Toda a resposta foi recebida. Exibir o resultado.
        resp.on('end', () => {
          console.log(JSON.stringify(data));
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    },
    start: true, // Start the job immediately
});

