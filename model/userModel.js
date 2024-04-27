const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new Schema ({
    name:{
        type:String,
        required: [true, 'Please provide a name'],
        minlength: [4, 'min length for usernmae is 4'],
    },
    email:{
        type:String,
        required: [true, 'Please provide an email address'],
        unique: true,
        
    },
    password:{
        type:String,
        required: [true, "Please enter your password"],
        minlength: [8,'password min length must be 8'],
    },
},{timestamps:true}); //this will add createdAt and updatedAt to


// hashing  the password before saving it into database
userSchema.pre("save", async function(next){
    const slt =await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password ,slt) ;
    next()
})

// password comparison


userSchema.methods.comparePassword = async function(userPassword){
    const isCorrect = await bcrypt.compare(userPassword,this.password);
    return isCorrect
}

// generate token

userSchema.methods.generateToken = async function(params){
    let token = jwt.sign({userId:this._id},process.env.JWT_SECRETE);
    return token;
}


const USER = mongoose.model("User",userSchema);

module.exports = USER;