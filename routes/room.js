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

module.exports = router;
