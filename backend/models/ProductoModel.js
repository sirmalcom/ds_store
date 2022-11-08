const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"Por favor, ingrese el nombre del producto"],
        trim: true,
        maxLength:[50, "El producto no debe exceder los 50 caracteres"]
    },
    descripcion:{
        type: String,
        required: [true, "Por favor, ingrese una descripcion del producto"],
        maxLength: [1000, "La descripcion no puede exceder los 1000 caracteres"]
    },
    precio:{
        type: Number,
        required: [true, "Por favor ingrese un precio para el producto"],
        maxLength: [8,"El precio no puede exceder los 8 caracteres"] 
    },
    descuento:{
        type: String,
        maxLength: [4, "El precio de descuente no puede exceder los 8 caracteres"]
    },
    tamaño:{
        type: String,
    },
    color:{
        type:String
    },
    ratings:{
        type: Number,
        default: 0
    },
    imagenes:[
        {
            public_id:{
                type: String,
                required: true,
            },
            url:{
                type:String,
                required:true
            },
        }
    ],
    categoria:{
        type: String,
        required: [true, "Por favor, ingrese una categoria"],
    },
    stock:{
        type: Number,
        required: [true, "Por favor, ingrese un numero de stock"],
        maxLength: [6, "El stock no puede exceder los 6 digitos"]
    },
    numeroDeResenas:{
        type: Number,
        default:0
    },
    resenas:[
        {
            usuario:{
                type: mongoose.Schema.ObjectId,
                ref: "Usuario",
                required: true
            },
            nombre:{
                type: String,
                required:true
            },
            rating:{
                type:Number,
                required: true
            },
            comentario:{
                type: String
            },
            tiempo:{
                type: Date,
                default: Date.now()
            } 
        }
    ],
    usuario:{
        type: mongoose.Schema.ObjectId,
        ref:"Usuario",
        required:false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
}) 

module.exports = mongoose.model("Producto",productoSchema)