const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Error de servidor interno"


    //wrong mongodb id error
    if(err.name === "CastError"){
        const message = "No se encontrar registros con este id invalido: " + err.path
        err = new ErrorHandler(message, 400)
    }

    //Duplicado de error de clave
    if(err.code === 11000){
        const message = `${Object.keys(err.keyValue)} duplicado`;   
        err = new ErrorHandler(message, 400)
    }

    //Error de JWT
    if(err.name === "jsonWebTokenError"){
        const message = `Su token es invalido, por favor intentelo de nuevo `;   
        err = new ErrorHandler(message, 400)
    }

    //Expiracion JWT
    if(err.name === "TokenExpiredError"){
        const message = `Su token ha expirado, por favor intentelo de nuevo `;   
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message 
    })
}



