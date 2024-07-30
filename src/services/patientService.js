import { v4 as uuidv4 } from 'uuid';
import db from "../models/index";
import { raw } from "body-parser";
import { flatMap, times } from "lodash";
import emailService from './emailService'
import { where } from 'sequelize';

require('dotenv').config();

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                });
            } else {
                let token = uuidv4()
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.doctorName,
                    time: data.timeString,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email,
                        roleId: 'R3'
                    },
                    raw: true
                });


                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        },
                    })
                }
                // create a bookin record
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed'
                })
            }

        } catch (e) {
            reject(e);
        }
    });
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let appointmnet = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointmnet) {
                    appointmnet.statusId = 'S2';
                    await appointmnet.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Cập nhật lịch khám thánh công!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Lịch khám đã được kích hoạt hoặc không tồn tại'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}