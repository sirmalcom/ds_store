const express = require("express")
const { createUser, loginUsuario } = require("../controllers/UsuarioController")
const router = express.Router()

router.route("/registro").post(createUser)

router.route("/login").post(loginUsuario)

module.exports = router

