const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./db/Database.js')

// Handling uncaught exception

process.on("uncaughtException", (err)=>{
    console.log("Error: " + err.message)
    console.log("Apgando el servidor por un error de Uncaught Exception")
})

// configuracion ENV

dotenv.config({
    path:"backend/config/.env"
})

//conexion a base de datos
connectDB()

// crear servidor

const server = app.listen(process.env.PORT, ()=>{
    console.log('El servidor esta corriendo en el puerto: ',process.env.PORT)
})


// Unhandled promise rejection 

process.on("unhandledRejection", (err) =>{
    console.log("Se esta cerrando la conexion al servidor debido a: " + err.message.toString())
    console.log("Se esta cerrando la conexion al servidor debido a un error de rechazo")
    server.close(()=>{
        process.exit(1)
    })
})
