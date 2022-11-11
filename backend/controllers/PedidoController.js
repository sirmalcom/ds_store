const Pedido = require("../models/PedidoModel")
const ErrorHandler = require("../utils/ErrorHandler.js")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

//Crear Pedido

exports.createOrder = catchAsyncErrors(async(req,res,next) => {
    const {
        informacionEnvio,
        articulosPedido,
        informacionPago,
        precioArticulos,
        precioImpuestos,
        precioEnvio,
        precioTotal
    } = req.body;

    const pedido = await Pedido.create({
        informacionEnvio,
        articulosPedido,
        informacionPago,precioArticulos,
        precioImpuestos,
        precioEnvio,
        precioTotal,
        pagadoEn: Date.now(),
        usuario: req.usuario._id
    });

    res.status(200).json({
        success:true,
        pedido
    });
});