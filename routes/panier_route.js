const express = require("express");
const router = express.Router();

const {addPanier, getAllPaniers, getAllPaniersByName, updatePanier, deletePanier} = require("../controllers/panier_controller");

router.post("/paniers", addPanier);
router.get("/paniers", getAllPaniers);
router.get("/paniers/date/:date_creation", getAllPaniersByName);
router.patch("/paniers/:id", updatePanier);
router.delete("/paniers/:id", deletePanier);

module.exports = router;