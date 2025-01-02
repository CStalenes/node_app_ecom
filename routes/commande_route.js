const express = require("express");
const router = express.Router();
const {addCommande, getAllCommandes, getAllCommandesByName, updateCommande, deleteCommande} = require("../controllers/commande_controller");


router.post("/commandes", addCommande);
router.get("/commandes", getAllCommandes);
router.get("/commandes/:statut", getAllCommandesByName);
router.patch("/commandes/:id", updateCommande);
router.delete("/commandes/:id", deleteCommande);

module.exports = router;
