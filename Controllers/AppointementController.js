const AppointementModel = require("../Models/AppointementModel");
const userModel = require("../Models/userModel");
const { ApiResponse } = require("../Utils/apiResponse");
const nodeMailer = require("nodemailer");

const sendMail = (email1, email2, date) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: "atulgupta0403@gmail.com",
        to: [email2, email1],
        subject: "Rescheduled Date",
        text: `Rescheduled on date ${date}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("error from sending mail = ", err)
        }
        else {
            console.log("Email Sent")
        }
    })
}

const count = async () => {
    const appoint = await AppointementModel.find();
    return appoint.length
    // console.log(appoint.length + "this is length of appoint")
}

const createAppointement = async (req, res) => {
    // console.log("controller se" , req.user)
    if (req.user) {

        const doctor_Id = req.query.doctor_Id;
        const appointment_id = await count() + 1;
        const user = await userModel.findOne({ username: req.user.username });
        const appoint = await AppointementModel.findOne({ appointment_id: appointment_id, Patient_ID: user._id });
        const doctor =  await userModel.findOne({ _id : doctor_Id })

        console.log("doctor " , doctor);
        

        if (appoint) {
            console.log(appoint)
            res.json(new ApiResponse(400 , "Apointement Id already exist" , "please try another appointement id"));
        }

        else {

            if (!doctor_Id) {
                res.json(new ApiResponse(300, "doctor_Id", "doctor_Id is required"))
            }

            else {
                const User = await AppointementModel.create({
                    Patient_ID: user._id,
                    Doctor_ID: doctor_Id,
                    Appointment_Date: Date.now(),
                    appointment_id: appointment_id,
                })

                const appointUser = await AppointementModel.findOne({ _id : User._id }).select("-createdAt -updatedAt -_id");

                doctor.Appointments.push(Date.now());
                await doctor.save()

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
                    html: `<p> ${appointUser}</p>`
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
        res.json(new ApiResponse(300, "NotLoggedIn", "please login!!"));
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

const appointementReschedule = async (req, res) => {

    if (req.user) {
        const appointment_id = req.query.appointment_id;
        const { new_date } = req.body;
        const patient = await userModel.findOne({ username: req.user.username, accountType: "patient" })
        if (patient) {
            const appoint = await AppointementModel.findOne({ appointment_id: appointment_id, status: "scheduled", Patient_ID: patient._id })
            if (appoint) {
                const doctor = await userModel.findOne({ _id: appoint.Doctor_ID })
                appoint.Appointment_Date = new_date;
                await appoint.save();
                console.log(doctor.email)
                sendMail(patient.email, doctor.email, new_date);
                res.json(new ApiResponse(200, appoint, "rescheduled done"))
            }
            else {
                res.json(new ApiResponse(200, `No scheduled appointement on appointement_Id = ${appointment_id}`))
            }
        }
        else {
            res.json(new ApiResponse(200, "you are not authorized to reschedule the appointement "))
        }
    }
    else {
        res.json(new ApiResponse(200, "Not loggedIn", "please login"))
    }
}

module.exports = { createAppointement, showAppointments, appointementReschedule }