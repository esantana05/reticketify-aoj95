exports.up = async function (knex) {
  await knex.schema.createTable("events", (table) => {
    table.string("id").primary();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("date").notNullable();
    table.string("location").notNullable();
    table.string("imageUrl").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
