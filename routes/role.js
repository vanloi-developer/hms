const express = require("express");

const roleController = require("../controllers/role");

const router = express.Router();

router.post(
  "/create",
  roleController.create
);

router.get(
  "/getAll",
  roleController.getAll
);

module.exports = router;
