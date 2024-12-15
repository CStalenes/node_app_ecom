const express = require("express");
const router = express.Router();

const {addPaiement, getAllPaiements, getAllPaiementsByName, updatePaiement, deletePaiement} = require("../controllers/paiement_controller");

router.post("/paiements", addPaiement);
router.get("/paiements", getAllPaiements);
router.get("/paiement/statut/:statut", getAllPaiementsByName);
router.patch("/paiements/:id", updatePaiement);
router.delete("/paiements/:id", deletePaiement);

module.exports = router;