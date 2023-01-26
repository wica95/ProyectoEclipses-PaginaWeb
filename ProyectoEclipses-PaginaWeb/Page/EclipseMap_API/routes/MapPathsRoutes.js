const express = require("express");
const router = express.Router();

const mapPaths_controller = require("../controllers/MapPathsController");

router.get("/MapPaths", mapPaths_controller.mapPaths_getall);
router.get("/MapPaths/:id", mapPaths_controller.mapPaths_getOne);
router.post("/MapPaths", mapPaths_controller.mapPaths_create);

module.exports = router;