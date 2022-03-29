const express = require("express");

const roomController = require("../controllers/room");

const router = express.Router();

router.post(
  "/create",
  roomController.create
);

router.get(
  "/getAll",
  roomController.getAll
);

router.get("/:id", roomController.get);

router.put("/:id", roomController.update);

router.delete("/:id", roomController.remove);

module.exports = router;
