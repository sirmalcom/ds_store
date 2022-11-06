const express = require("express")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const { createUser, loginUsuario, logoutUsuario,forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser} = require("../controllers/UsuarioController")
const router = express.Router()

router.route("/registro").post(createUser);

router.route("/login").post(loginUsuario);

router.route("/logout").get(logoutUsuario);

router.route("/contrasena/recuperar").post(forgotPassword);

router.route("/contrasena/resetear/:token").put(resetPassword);

router.route("/admin/usuario/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser);

router.route("/admin/usuarios").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

router.route("/yo").get(isAuthenticatedUser,userDetails);

router.route("/yo/actualizar/info").put(isAuthenticatedUser,updateProfile);

router.route("/yo/actualizar").put(isAuthenticatedUser,updatePassword);

module.exports = router

