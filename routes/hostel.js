const express = require("express");

const hostelController = require("../controllers/hostel");

const router = express.Router();

router.post("/create", hostelController.create);

router.get("/getAll", hostelController.getAll);

router.get("/:id", hostelController.get);

router.put("/:id", hostelController.update);

router.delete("/:id", hostelController.remove);

module.exports = router;
