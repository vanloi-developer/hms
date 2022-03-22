const express = require("express");

const hostelController = require("../controllers/hostel");

const router = express.Router();

router.post(
  "/create",
  hostelController.create
);

router.get(
  "/getAll",
  hostelController.getAll
);

module.exports = router;
