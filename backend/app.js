const express = require('express')
const app = express()
const ErrorHandler = require('./middleware/error')

app.use(express.json())

// Importar las rutas
const producto = require("./routes/ProductoRoute")
const usuario = require("./routes/UsuarioRoute")

app.use("/api/v2",producto)
app.use("/api/v2",usuario)

app.use(ErrorHandler)

module.exports = app