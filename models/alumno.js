var bcrypt=require("bcrypt-nodejs");
var mongoose = require("mongoose");

var SALT_FACTOR = 10;

var alumnoSchema = mongoose.Schema({
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    sexo:{type:String,required:true},
    matricula:{type:Number,required:true},
    calificacion:{type:Number, required:true},
});

var Alumno = mongoose.model("evaluacion",alumnoSchema);
module.exports = Alumno;