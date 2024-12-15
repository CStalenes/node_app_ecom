const express = require("express");
const router = express.Router();

const {addClient, getAllClients, getAllClientsByName, updateClient, deleteClient} = require("../controllers/client_controller");

router.post("/clients", addClient);
router.get("/clients", getAllClients);
router.get("/clients/nom/:nom", getAllClientsByName);
router.patch("/clients/:id", updateClient);
router.delete("/clients/:id",deleteClient);

module.exports = router;
