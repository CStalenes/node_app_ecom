const express = require("express");
const router = express.Router();

const {addArticle, getAllArticles, getAllArticlesByName, updateArticle, deleteArticle } = require("../controllers/article_controller");

router.post("/articles", addArticle);
router.get("/articles", getAllArticles);
router.get("/articles/:nom_article", getAllArticlesByName);
router.patch("/articles/:id", updateArticle);
router.delete("/articles/:id",deleteArticle);

module.exports = router;