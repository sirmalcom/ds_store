const express = require("express")
const { createUser } = require("../controllers/UsuarioController")
const router = express.Router()

router.route("/registro").post(createUser)

module.exports = router

