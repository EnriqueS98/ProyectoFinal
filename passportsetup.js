var passport=require("passport");
var User=require("./models/user");

var LocalStrategy = require("passport-local").Strategy;

module.exports=()=>{
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user);
        });
    });
};

passport.use("singin", new
LocalStrategy(function(username,password,done){
    User.findOne({username:username}, function(err,user){
        if(err){
            return done(err);
        }
        if(!user){
            return
            done(null,false,{message:"No existe ningun usuario con ese nombre"})
        }
        user.checkPassword(password,(err,isMatch)=>{
            if(err){
                return done(err);
            }
            if(isMatch){
                return done(null,user)
            }else{
                return done(null,false,{message:"La contrasena es invalida"})
            }
        })
    })
}))