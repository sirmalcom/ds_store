const express = require("express");
const { route } = require("../app");
const {
  getAllProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  getSingleProducto,
} = require("../controllers/ProductoController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/productos").get(getAllProductos);

router.route("/producto/crear").post(isAuthenticatedUser,authorizeRoles("admin"),createProducto);

router.route("/producto/:id").put(updateProducto);

router.route("/producto/:id").delete(deleteProducto);

router.route("/producto/:id").get(getSingleProducto);

module.exports = router;
