const jwt = require("jsonwebtoken");
const Usuario = require("../models/UsuarioModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Por favor, inicie sesion",401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
     req.usuario = await Usuario.findById(decodedData.id);

     next();
})

// Roles de administrador

exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.usuario.rol)){
            return next(new ErrorHandler(req.usuario.rol + " no tiene permisos"))
        }
        next()
    }
} 