const mongoose = require("mongoose")
const {isEmail  } = require("validator");

const userSchema = new mongoose.Schema({
  
  
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    email: {
      type: String,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", 
      },
    ],
    // followers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // following: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // friends:[
    //   {
    //     conversationId: String,
    //      friendid: String,
    //      friendname: String,
    //       friendavatar: String,
    //   }
    // ],
    // secretToken: String,
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
  
 
});








const User = mongoose.model("userSchema", userSchema);



module.exports = User;
