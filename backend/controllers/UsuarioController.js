const Usuario = require("../models/UsuarioModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/JwtToken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto")


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

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const usuario = await Usuario.findOne({email:req.body.email});

    if(!usuario){
        return next(new ErrorHandler("El email no se encuentra registrado",404))
    }

    // Obtener el token para resetear el password

    const resetToken = usuario.getResetToken()

    await usuario.save({
        validateBeforeSave: false
    });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/contraseña/reset/${resetToken}`;

    const message = `Tu contraseña reseteada es :- \n\n ${resetPasswordUrl}`;

    try {
        
        await sendMail({
            email: usuario.email,
            subject: `Recuperacion de contraseña`,
            message,
        });

        res.status(200).json({
            success: true, 
            message: `Email enviado a ${usuario.email} de manera exitosa`
        });

    } catch (error) {
        usuario.resetPasswordToken = undefined;
        usuario.resetPasswordTime = undefined;

        await usuario.save({
            validateBeforeSave: false
        });

        return next(new ErrorHandler(error.message))
    }
});

// Resetear contraseña

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    
    // Crear un token hash

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const usuario = await Usuario.findOne({
        resetPasswordToken,
        resetPasswordTime: {$gt: Date.now()}
    })

    if(!usuario){
        return next(new ErrorHandler("El reseteo de su contraseña no es valida o esta expirada"),400);
    }

    if(req.body.contraseña !== req.body.confirmPassword){
        return next(new ErrorHandler("La contraseña no es igual a la contraseña anterior"),400);

    }

    usuario.contraseña = req.body.contraseña;

    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordTime = undefined;

    await usuario.save();

    sendToken(usuario,200,res);

})

