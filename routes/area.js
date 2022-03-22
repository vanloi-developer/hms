const express = require("express");

const areaController = require("../controllers/area");

const router = express.Router();

router.post(
  "/create",
  areaController.create
);

router.get(
  "/getAll",
  areaController.getAll
);

module.exports = router;
