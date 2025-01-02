const express = require('express');
const router = express.Router();

const {addAjouter, getAllAjouters, getAllAjoutersByName, updateAjouter, deleteAjouter} = require("../controllers/ajouter_controller");

router.post("/ajouters", addAjouter);
router.get("/ajouters", getAllAjouters);
router.get("/ajouters/:prix_article", getAllAjoutersByName);
router.patch("/ajouters/:id_ajouter", updateAjouter);
router.delete("/ajouters/:id_ajouter", deleteAjouter);

module.exports = router;