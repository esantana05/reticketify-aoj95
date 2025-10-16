const { z } = require("zod");

const eventSchema = z.object({
  id: z.string().ulid(),
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().refine((val) => !isNaN(Date.parse(val))),
  location: z.string().min(1),
  imageUrl: z.string().url(),
});

module.exports = { eventSchema };
