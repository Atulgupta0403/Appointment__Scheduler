const mongoose = require("mongoose");

const AppointementSchema = new mongoose.Schema({
    Patient_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Doctor_ID: {
        type: Number
    },
    Appointment_Date: {
        type: Date
    },
    appointment_id: {
        type: Number
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed'],
        default: 'scheduled'
    }
}, { timestamps: true })


module.exports = mongoose.model("Appointement", AppointementSchema)