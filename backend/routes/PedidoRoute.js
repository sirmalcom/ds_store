const express = require("express");
const { createOrder } = require("../controllers/PedidoController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const router = express.Router()

router.route("/pedido/crear").post(isAuthenticatedUser,createOrder);

module.exports = router;

