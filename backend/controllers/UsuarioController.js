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
    })

     const token = usuario.getJwtToken()

    res.status(201).json({
        success:true,
        token
    })
})

// Inicio de sesion usuario

exports.loginUser = catchAsyncErrors(async (req,res,next) => {
    const {email,contraseña} = req.body
    if(!email || !contraseña){
        return next(new ErrorHandler("Por favor ingrese su email y su contraseña"))
    }
})

