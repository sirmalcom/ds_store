const ErrorHandler = require("../utils/ErrorHandler.js");
const Features = require("../utils/Features");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Producto = require("../models/ProductoModel.js");

// Crear un producto

exports.createProducto = catchAsyncErrors(async (req, res) => {
  const producto = await Producto.create(req.body);
  res.status(201).json({
    success: true,
    producto,
  });
});

// 0btener todos los productos

exports.getAllProductos = catchAsyncErrors(async (req, res) => {
  
  const resultPerPage = 8

  const productCount = await Producto.countDocuments()

  const feature = new Features(Producto.find(), req.query).search().filter().pagination(resultPerPage);
  const productos = await feature.query;
  res.status(200).json({
    success: true,
    productos,
    resultPerPage
  });
});

// Actualizar un producto

exports.updateProducto = catchAsyncErrors(async (req, res, next) => {
  let producto = await Producto.findById(req.params.id);
  if (!producto) {
    return next(
      new ErrorHandler("El producto no se encuentra registrado", 404)
    );
  }

  producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    producto,
  });
});

// Eliminar un producto

exports.deleteProducto = catchAsyncErrors(async (req, res, next) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) {
    return next(
      new ErrorHandler("El producto no se encuentra registrado", 404)
    );
  }

  await producto.remove();

  res.status(200).json({
    success: true,
    message: "El producto fue eliminado satisfactoriamente",
  });
});

// Visualizar un producto especifico

exports.getSingleProducto = catchAsyncErrors(async (req, res, next) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    return next(
      new ErrorHandler("El producto no se encuentra registrado", 404)
    );
  }

  res.status(200).json({
    success: true,
    producto,
    productCount
  });

});

// Crear una reseña y actualizarla

exports.createProductReview = catchAsyncErrors(async (req,res,next) => {

  const { rating, comentario, productoId} = req.body;

  const review = {
    usuario: req.usuario._id,
    nombre: req.usuario.nombre,
    rating: Number(rating),
    comentario: String(comentario)
  };

  const producto = await Producto.findById(productoId);

  const isReviewed = producto.resenas.find(
    (rev) => rev.usuario?.toString() === req.usuario._id.toString()
  );

  if(isReviewed){
    producto.resenas.forEach((rev)=>{
      if(rev.usuario._id.toString() === req.usuario._id.toString()){
       (rev.rating = rating), (rev.comentario = comentario); 
      } 
    });
  } else {
    producto.resenas.push(review);
    producto.numeroDeResenas = producto.resenas.length;
  }

  let avg = 0;

  producto.resenas.forEach((rev)=>{
    avg += rev.rating
  });

  producto.ratings = avg / producto.resenas.length;

  await producto.save({validateBeforeSave: false});

  res.status(200).json({
    success: true
  }); 

});
