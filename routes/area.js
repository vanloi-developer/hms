const express = require("express");

const areaController = require("../controllers/area");

const router = express.Router();

router.post("/create", areaController.create);

router.get("/getAll", areaController.getAll);

router.get("/:id", areaController.get);

router.put("/:id", areaController.update);

router.delete("/:id", areaController.remove);



module.exports = router;
