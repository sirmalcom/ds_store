const Usuario = require("../models/UsuarioModel")
const ErrorHandler = require("../utils/ErrorHandler.js")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")


//Registrar usuario 
exports.createUser = catchAsyncErrors(async (req,res,next)=>{
    const {nombre,email,contraseña} = req.body

    const usuario = await Usuario.create({
        nombre,
        email,
        contraseña,
        avatar:{
            public_id:"https://test.com",
            url:"https://test.com"
        }
    });

     const token = usuario.getJwtToken()

    res.status(201).json({
        success:true,
        token
    });
});

// Inicio de sesion usuario

exports.loginUsuario = catchAsyncErrors(async (req,res,next) => {
    const {email,contraseña} = req.body;
    if(!email || !contraseña){
        return next(new ErrorHandler("Por favor ingrese su email y su contraseña",400))
    };
    const usuario = await Usuario.findOne({email}.select("+contraseña"));

    if(!usuario){
        return next(new ErrorHandler("Usuario no encontrado con este email y contraseña",401))

    };

    const isPasswordMatched = await usuario.comparePassword(contraseña)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Usuario no encontrado con este email y contraseña",401))
    };

    const token = usuario.getJwtToken();

    res.status(201).json({
        success:true,
        token
    });
});

