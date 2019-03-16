var bcrypt=require("bcrypt-nodejs");
var mongoose = require("mongoose");

var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username:{type:String,upercase:true,required:true,unique:true},
    password:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
});

var donothing= ()=>{
}
userSchema.pre("save",function(done){
    var user = this;
    if(!user.isModified("password")){
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR,function(err, salt){
        if(err){
            return done(err);
        }
        bcrypt.hash(user.password, salt, donothing,
        function(err, hashedpassword){
        if(err){
            return done(err);
        }
        user.password = hashedpassword;
        done();
        });
    });
});
userSchema.methods.checkPassword = function(guess, done)  {
    bcrypt.compare(guess,this.password,function(err, isMatch){
        done(err,isMatch);
    });
}
userSchema.methods.name = function(){
    return this.displayName || this.username;
}

var User = mongoose.model("User",userSchema);
module.exports = User;