import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        unique: true
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2VbXmqI230WXc9a65qY6V3&ust=1703095169487000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMCegoiKnIMDFQAAAAAdAAAAABAD",
    }
}, {timestamps: true, versionKey:false});

const User = mongoose.model('User',userSchema);

export default User;