const express = require('express');

const router = express.Router();
const {createUser, getUser, getUserById, updateUser, deleteUser, login} = require("../controllers/user_controller");
const {checkToken} = require('../auth/token_validation');

router.post("/", checkToken, createUser);
router.get("/", getUser);
router.get("/:id", checkToken, getUserById);
router.patch("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser);
router.post("/login", login);


module.exports = router;