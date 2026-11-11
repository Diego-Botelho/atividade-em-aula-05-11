const express = require("express");
const router = express.Router();

const heroesController = require("../controllers/heroes.controller.js");

router.get("/", heroesController.list);
router.get("/:id", heroesController.getById);
router.post("/", heroesController.create);
router.put("/:id", heroesController.update);
router.patch("/:id", heroesController.patch);
router.delete("/:id", heroesController.remove);

module.exports = router;




