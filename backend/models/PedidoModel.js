const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  informacionEnvio: {
    distrito:{
        type:String,
        // required: true
    },
    direccion: {
      type: String,
      // required: true,
    },
    numeroCelular: {
      type: String,
      // required: true,
    },
    referencia: {
        type: String,
        // required: true,
    }
  },
  articulosPedido: [
    {
      nombreProducto: {
        type: String,
        required: true,
      },
      precioProducto: {
        type: Number,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      imagenProducto: {
        type: String,
        required: true,
      },
      idProducto: {
        type: mongoose.Schema.ObjectId,
        ref: "Producto",
        required: true,
      },
    },
  ],
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    required: true,
  },
  informacionPago: {
    id: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
  },
  pagadoEn: {
    type: Date,
    required: true,
  },
  precioArticulos: {
    type: Number,
    required: true,
    default: 0,
  },
  precioImpuestos: {
    type: Number,
    default: 0,
  },
  precioEnvio: {
    type: Number,
    required: true,
    default: 0,
  },
  precioTotal: {
    type: Number,
    required: true,
    default: 0,
  },
  estadoPedido: {
    type: String,
    required: true,
    default: "Procesando",
  },
  enviadoEn: Date,
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pedido", pedidoSchema);