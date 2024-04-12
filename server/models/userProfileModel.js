const mongoose = require("mongoose");

const profileModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    pic:{
        type:String,
        required:false
    },
    location:{
        type:String,
        required:true
    },
    interests:[{
        type:String
    }]
})

const Profile = mongoose.model('Profile',profileModel);
module.exports = Profile;