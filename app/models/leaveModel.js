import mongoose from "mongoose"

const leaveSchema = mongoose.Schema({
    leaveType: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    reason: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    employeeId: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: 'pending'
    }
},{ timestamps: true })

const leaveModel = mongoose.models.leave || mongoose.model('leave', leaveSchema);
export default leaveModel;