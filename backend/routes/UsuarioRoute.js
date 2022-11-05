const express = require("express")
const { createUser, loginUsuario, logoutUsuario,forgotPassword, resetPassword } = require("../controllers/UsuarioController")
const router = express.Router()

router.route("/registro").post(createUser);

router.route("/login").post(loginUsuario);

router.route("/logout").post(logoutUsuario);

router.route("/contrasena/recuperar").post(forgotPassword);

router.route("/contrasena/resetear/:token").put(resetPassword);

module.exports = router

