const Pedido = require("../models/PedidoModel")
const Producto = require("../models/ProductoModel");
const ErrorHandler = require("../utils/ErrorHandler.js")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const moment = require('moment-timezone')
const now = moment(Date.now())

//Crear Pedido

exports.createOrder = catchAsyncErrors(async(req,res,next) => {
    const {
        informacionEnvio,
        articulosPedido,
        informacionPago,
        precioArticulos,
        precioImpuestos,
        //precioEnvio,
        precioTotal
    } = req.body;

    const pedido = await Pedido.create({
        informacionEnvio,
        articulosPedido,
        informacionPago,precioArticulos,
        precioImpuestos,
        //precioEnvio,
        precioTotal,
        pagadoEn: Date.now(),
        usuario: req.usuario._id
    });

    res.status(200).json({
        success:true,
        pedido
    });
});

// Ver pedido

exports.getSingleOrder = catchAsyncErrors(async (req,res,next)=>{
    const pedido = await Pedido.findById(req.params.id).populate(
        "usuario",
        "nombre email"
    );

    if(!pedido){
        return next(new ErrorHandler("No se encontraron articulos de ese pedido con ese id",404));
    }

    res.status(200).json({
        success:true,
        pedido
    });

});

// Visualizar todos los pedidos

exports.getAllOrders = catchAsyncErrors(async (req,res,next)=>{
 const pedidos = await Pedido.find({usuario: req.usuario._id});

 res.status(200).json({
    success:true,
    pedidos
})
});

// Visualizar todos los pedidos --Admin

exports.getAdminAllOrders = catchAsyncErrors(async (req,res,next)=>{
    const pedidos = await Pedido.find();

    let CantidadTotal = 0; 

    pedidos.forEach((pedido)=>{
        CantidadTotal += pedido.precioTotal;
    });

    res.status(200).json({
        success:true,
        CantidadTotal,
        pedidos
    });
});

// update Order Status ---Admin
exports.updateAdminOrder = catchAsyncErrors(async (req, res, next) => {

    const pedido = await Pedido.findById(req.params.id);
  
    if (!pedido) {
      return next(new ErrorHandler("Pedido no encontrado con este id", 404));
    }
  
    if (pedido.estadoPedido === "Entregado") {
      return next(new ErrorHandler("Este pedido ya fue enviado", 400));
    }
  
    if (req.body.status === "Enviado") {
      pedido.articulosPedido.forEach(async (o) => {
        await updateStock(o.idProducto, o.cantidad);  
      });
    }
    pedido.estadoPedido = req.body.status;
  
    if (req.body.status === "Enviado") {
      pedido.enviadoEn = Date.now();
    }
  
    await pedido.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, cantidad) {
      
    const producto = await Producto.findById(id);
  
    producto.stock = producto.stock - cantidad;
  
    await producto.save({ validateBeforeSave: false });
  }

  // Eliminar pedido 

  exports.deleteOrder = catchAsyncErrors(async (req,res,next) =>{

    const pedido = await Pedido.findById(req.params.id);
    
    if(!pedido){
      return next(new ErrorHandler("Pedido no encontrado con este id", 404));
    }

    await pedido.remove();

    res.status(200).json({
        success: true
    });
});