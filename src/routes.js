const express = require("express");
const router = express.Router();

const EventController = require("./controllers/EventController");

router.get("/event", EventController.index);
router.get("/event/:id", EventController.find);
router.post("/event", EventController.create);
router.delete("/event/:id", EventController.remove);

module.exports = router;
