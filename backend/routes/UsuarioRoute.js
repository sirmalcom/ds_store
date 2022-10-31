const express = require("express")
const { createUser, loginUsuario, logoutUsuario } = require("../controllers/UsuarioController")
const router = express.Router()

router.route("/registro").post(createUser);

router.route("/login").post(loginUsuario);

router.route("/logout").post(logoutUsuario);



module.exports = router

