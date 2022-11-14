const express = require("express");
const { createOrder, getSingleOrder, getAllOrders, getAdminAllOrders, updateAdminOrder } = require("../controllers/PedidoController");
const { getAllUsers } = require("../controllers/UsuarioController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const router = express.Router()

router.route("/pedido/crear").post(isAuthenticatedUser,createOrder);

router.route("/pedido/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/pedidos/yo").get(isAuthenticatedUser,getAllOrders);

router.route("/admin/pedidos").get(isAuthenticatedUser,getAdminAllOrders,authorizeRoles("admin"));

router.route("/admin/pedido/:id").put(isAuthenticatedUser,updateAdminOrder,authorizeRoles("admin"));

module.exports = router;

