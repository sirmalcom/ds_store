const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Error de servidor interno"


    //wrong mongodb id error
    if(err.name === "CastError"){
        const message = "No se encontrar registros con este id invalido: " + err.path
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message 
    })
}

