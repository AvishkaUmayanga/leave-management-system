import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    employeeId: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: {
        type: String,
        default: null,
    },
    forgetPasswordTokenExpiry: {
        type: Date,
        default: null,
    },
    verifyToken: {
        type: String,
        default: null,
    },
    verifyTokenExpiry: {
        type: Date,
        default: null,
    },
    leaves:{
        type: [{
            leaveType: { type: String, required: true },
            totalLeaves: { type: Number },
            usedLeaves: { type: Number },
            remainingLeaves: { type: Number }
        }],
        default: [
            {
                leaveType: "Casual Leave",
                totalLeaves: 10,
                usedLeaves: 0,
                remainingLeaves: 10
            },
            {
                leaveType: "Earned Leave",
                totalLeaves: 1,
                usedLeaves: 0,
                remainingLeaves: 1
            },
            {
                leaveType: "Sick Leave",
                totalLeaves: 12,
                usedLeaves: 0,
                remainingLeaves: 12
            },
            {
                leaveType: "Paternity Leave",
                totalLeaves: 3,
                usedLeaves: 0,
                remainingLeaves: 3
            }
        ]
    }
},{ timestamps: true });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;