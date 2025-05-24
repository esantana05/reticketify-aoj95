const { faker } = require("@faker-js/faker");

exports.seed = async function (knex) {
  await knex("events").del();

  const fixedEvent = {
    id: "01JW03J5WK6KJH2H6ADA59SGM6",
    title: "Tomorrowland",
    description:
        "O maior festival de música eletrônica do mundo, com DJs renomados e experiências inesquecíveis.",
    date: "2025-10-10",
    location: "Parque Maeda, Itú - SP",
    imageUrl:
        "https://github.com/FIAP.png",
  };

  const fakeEvents = Array.from({ length: 9 }).map(() => ({
    id: faker.string.ulid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    description: faker.lorem.words({ min: 3, max: 7 }),
    date: faker.date.future().toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    location: `${faker.location.city()}, ${faker.location.state()}`,
    imageUrl: "https://github.com/FIAP.png",
  }));

  await knex("events").insert([fixedEvent, ...fakeEvents]);
};
