const { Server } = require("socket.io");

let io;

function setupWebsocket(server, db) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    try {
      const events = await db("events").orderBy("date");

      const formattedEvents = events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
      }));

      socket.emit("listaEventos", formattedEvents);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
    }

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
}

function sendMessage(event, data) {
  if (io) {
    io.emit(event, data);
  }
}

module.exports = { setupWebsocket, sendMessage };