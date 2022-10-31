const Usuario = require("../models/UsuarioModel")
const ErrorHandler = require("../utils/ErrorHandler.js")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/JwtToken");


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

    sendToken(usuario,200,res);
});

// Inicio de sesion usuario

exports.loginUsuario = catchAsyncErrors(async (req,res,next) => {
    const {email,contraseña} = req.body;
    if(!email || !contraseña){
        
        return next(new ErrorHandler("Por favor ingrese su email y su contraseña",400));
    }
    const usuario = await Usuario.findOne({email}).select("+contraseña");

    if(!usuario){
        
        return next(new ErrorHandler("Usuario no encontrado con este email y contraseña",401));

    }

    const isPasswordMatched = await usuario.comparePassword(contraseña);

    if(!isPasswordMatched){
        
        return next(new ErrorHandler("Usuario no encontrado con este email y contraseña",401));
    }

    sendToken(usuario,200,res);
})

//Termino de sesion de usuario

exports.logoutUsuario = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(),
        httpOnly: true,
    });

    res.status(200).json({
        success:true,
        message: "Termino de sesion exitosa",
    });
});

// Olvido de contraseña

exports.forgetPassword = catchAsyncErrors(async(req,res,next)=>{
    const usuario = await User.findOne({email:req.body.email});

    if(!usuario){
        return next(new ErrorHandler("El email no se encuentra registrado",404))
    }

    // Obtener el token para resetear el password

    const resetToken = usuario.getResetToken()
})

