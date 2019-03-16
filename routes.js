var express = require("express");
var Alumno = require("./models/alumno");
var User = require("./models/user");
var passport = require("passport");


var acl=require('express-acl');

var passport=require("passport");

var router = express.Router();

router.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});
router.get("/users/:username",(req,res,next)=>{
    User.findOne({ username:req.params.username},(err,user)=>{
        if(err){
            return next (err);

        }
        if (!user){
            return next(404);
        }
        res.render("index",{user: user}); 
});
});


router.get("/",(req,res)=>{
    res.render("singin");
});
router.get("/evaluacion",(req,res)=>{
    res.render("evaluacion");
});

router.get("/index",(req,res,next)=>{
    User.find()
    .sort({createdAt: "descending"})
    .exec((err,users)=> {
        if(err){
            return next(err);
        }
        res.render("index",{users: users});
    });  
});



router.get("/singin",(req,res)=>{
    res.render("singin");
});

router.post("/singin", passport.authenticate("singin",{
    successRedirect:"/evaluacion",
    failureRedirect:"/singin",
    failureFlash:true
}));

router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/singin");
});

router.post("/evaluacion",(req,res,next)=>{
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var  sexo= req.body.sexo;
    var matricula = req.body.matricula;
    var calificacion = req.body.calificacion;

        var newAlumno = new Alumno({
            nombre: nombre,
            apellido: apellido,
            sexo: sexo,
            matricula: matricula,
            calificacion: calificacion
        });
        newAlumno.save(next);
        return res.redirect("/evaluacion_list");
    });

    router.get("/evaluacion_list",(req,res,next)=>{
        Alumno.find()
        .sort({ createdAt: "descending"})
        .exec((err,evaluacion)=> {
            if(err){
                return next(err);
            }
            res.render("evaluacion_list",{evaluacion: evaluacion});
        });  
    });

    router.get("/index",(req,res)=>{
        res.render("index");
    });




module.exports = router;
