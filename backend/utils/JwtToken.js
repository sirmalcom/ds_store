// crear el token y guardarlo en las cookies

const sendToken = (usuario, statusCode, res)=>{
    const token = usuario.getJwtToken();

    // Opciones para las cookies 

    const options = {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        usuario,
        token
    });
}

module.exports = sendToken