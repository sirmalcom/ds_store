const express = require('express')
const app = express()
const ErrorHandler = require('./middleware/error')
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

// Importar las rutas
const producto = require("./routes/ProductoRoute")
const usuario = require("./routes/UsuarioRoute")

app.use("/api/v2",producto)
app.use("/api/v2",usuario)

app.use(ErrorHandler)

module.exports = app