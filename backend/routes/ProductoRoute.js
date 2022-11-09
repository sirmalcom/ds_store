const express = require("express");
const { route } = require("../app");
const {
  getAllProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  getSingleProducto,
  createProductReview,
  getSingleProductReviews,
  deleteReview,
} = require("../controllers/ProductoController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/productos").get(getAllProductos);

router.route("/producto/crear").post(isAuthenticatedUser,authorizeRoles("admin"),createProducto);

router.route("/producto/:id").put(updateProducto);

router.route("/producto/:id").delete(deleteProducto);

router.route("/producto/:id").get(getSingleProducto);

router.route("/producto/resena").post(isAuthenticatedUser,createProductReview);

router.route("/resenas").get(getSingleProductReviews);

router.route("/resenas").delete(isAuthenticatedUser,deleteReview,authorizeRoles("admin"));

module.exports = router;
