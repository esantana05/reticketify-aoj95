const connection = require("../database/connection");
const { eventSchema } = require("../validators/eventValidator");
const { sendMessage } = require("../websocket");
const { ulid } = require("ulid");

const index = async (req, res) => {
  const posts = await connection("events").orderBy("date");

  const formattedEvents = posts.map((events) => ({
    id: events.id,
    title: events.title,
    description: events.description,
    date: events.date,
    location: events.location,
    imageUrl: events.imageUrl,
  }));

  return res.json(formattedEvents);
};

const find = async (req, res) => {
  const { id } = req.params;

  const event = await connection("events").where({ id }).first();

  if (!event) return res.status(404).json({ erro: "Event not found" });

  const formattedEvent = {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    imageUrl: event.imageUrl,
  };

  return res.json(formattedEvent);
};

const create = async (req, res) => {
  const eventInValidation = eventSchema.safeParse(req.body);

  if (!eventInValidation.success) {
    return res.status(400).json(eventInValidation.error.errors);
  }

  const id = ulid();
  const { title, description, date, location, imageUrl } =
    eventInValidation.data;
  const [createdEvent] = await connection("events").insert({
    id,
    title,
    description,
    date,
    location,
    imageUrl,
  })

  const eventCreated = { id, title, description, date, location, imageUrl };

  sendMessage("novoEvento", eventCreated);
  return res.status(201).json(eventCreated);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const eventDeleted = await connection("events").where({ id }).del();

  if (!eventDeleted) return res.status(404).json({ erro: "Event not found" });

  return res.status(204).send();
}

module.exports = { index, find, create, remove };
