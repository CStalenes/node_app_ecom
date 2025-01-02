const express = require("express");
const router = express.Router();

const {addContenir, getAllContenirs, getAllContenirsByName, updateContenir, deleteContenir} = require("../controllers/contenir_controller");

router.post("/contenirs", addContenir);
router.get("/contenirs", getAllContenirs);
router.get("/contenirs/:date_creation", getAllContenirsByName);
router.patch("/contenirs/:id_contenir", updateContenir);
router.delete("/contenirs/:id_contenir", deleteContenir);

module.exports = router;