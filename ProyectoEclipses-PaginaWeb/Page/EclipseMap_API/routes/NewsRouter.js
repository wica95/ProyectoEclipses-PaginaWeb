const express = require("express");
const router = express.Router();

const news_controller = require("../controllers/NewsController");

router.get("/News", news_controller.news_getAll);
router.get("/News/:header", news_controller.news_getOne);
router.post("/News", news_controller.news_create);