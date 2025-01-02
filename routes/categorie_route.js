const express = require("express");
const router = express.Router();

const {addCategorie, getAllCategories, getAllCategoriesByName, updateCategorie, deleteCategorie} = require("../controllers/categorie_controller");

router.post("/categories", addCategorie);
router.get("/categories", getAllCategories);
router.get("/categories/:nom_categorie", getAllCategoriesByName);
router.patch("/categories/:id", updateCategorie);
router.delete("/categories/:id",deleteCategorie);



module.exports = router;