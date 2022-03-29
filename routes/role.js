const express = require("express");

const roleController = require("../controllers/role");

const router = express.Router();

router.post("/create", roleController.create);

router.get("/getAll", roleController.getAll);

router.get("/:id", roleController.get);

router.put("/:id", roleController.update);

router.delete("/:id", roleController.remove);

module.exports = router;
