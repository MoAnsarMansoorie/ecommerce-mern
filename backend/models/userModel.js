import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {
    minimize: false, // Disable minimization to allow empty objects
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const userModel = mongoose.model.user || mongoose.model('User', userSchema);
export default userModel;