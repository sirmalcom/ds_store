const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required: [true,"Por favor ingrese su nombre"],
        minLength:[3,"Por favor ingrese un nombre de al menos 3 caracteres"],
        maxLength:[15,"El nombre no puede ser de mas de 15 caracteres"]
    },
    email:{
        type:String,
        index: {unique:true, dropDups: true},
        required:[true,"Por favor ingrese su email"],
        validate:[validator.isEmail,"Por favor ingrese un email valido"]
    },
    contraseña:{
        type:String,
        required:[true,"Por favor, ingrese su contraseña"],
        minLength:[8,"La contraseña debe de ser mayo a 8 caracteres"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    rol:{
        type:String,
        default:"usuario"
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

// Hash Contraseña

usuarioSchema.pre("save",async function(next){
    if(!this.isModified("contraseña")){
        next()
    }
    this.contraseña = await bcrypt.hash(this.contraseña,10)
});

//jwt token

usuarioSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    });
};

// comparar contraseñas hash

usuarioSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.contraseña)
};

// Recuperar contraseña
usuarioSchema.methods.getResetToken = function(){
    // Generando el token
    const resetToken = crypto.randomBytes(20).toString("hex");
// hashear y añadir el reseteo de la contraseña 

this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

return resetToken;

}

module.exports = mongoose.model("Usuario", usuarioSchema);