const AppointementModel = require("../Models/AppointementModel");
const userModel = require("../Models/userModel");
const { ApiResponse } = require("../Utils/apiResponse");
const nodeMailer = require("nodemailer");


const createAppointement = async (req, res) => {
    // console.log("controller se" , req.user)
    if (req.user) {

        const doctor_Id = req.query.doctor_Id;
        const { appointment_id } = req.body;
        const user = await userModel.findOne({ username: req.user.username });
        const appoint = await AppointementModel.findOne({ appointment_id: appointment_id, Patient_ID: user._id });

        if (appoint) {
            console.log(appoint)
            res.json("Apointement Id already exist")
        }

        else {

            if (!doctor_Id) {
                res.json(new ApiResponse(300, "doctor_Id", "doctor_Id is required"))
            }

            else {
                const appointUser = await AppointementModel.create({
                    Patient_ID: user._id,
                    Doctor_ID: doctor_Id,
                    Appointment_Date: Date.now(),
                    appointment_id: appointment_id
                })

                const transporter = nodeMailer.createTransport({
                    service: "gmail",
                    secure: true,
                    port: 465,
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASS
                    }
                })

                const mailOptions = {
                    from: process.env.USER,
                    to: user.email,
                    subject: 'Appointement Scheduled',
                    text: `Your appointement should be scheduled by doctorId = ${doctor_Id}`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send(`Error sending email ${error}`);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.json(new ApiResponse(200, appointUser, 'Appointement Scheduled'));
                    }
                })
            }
        }
    }
    else {
        res.json(new ApiResponse(300, "NotLoggedIn", "please login"));
    }
}


const showAppointments = async (req, res) => {
    if (req.user) {
        const user = await userModel.findOne({ username: req.user.username })
        const appoint = await AppointementModel.find({ Patient_ID: user._id, status: "scheduled" })
        res.json(new ApiResponse(200, appoint, "All Appointements"))
    }
    else {
        res.json(new ApiResponse(300, "not LoggedIn", "please login"));
    }
}

module.exports = { createAppointement, showAppointments }