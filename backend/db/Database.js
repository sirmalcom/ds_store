const mongoose = require('mongoose')


const connectDB = () =>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data)=>{
        console.log("Conexion a base de datos exitosa en el servidor:",data.connection.host)
    })
}

module.exports = connectDB