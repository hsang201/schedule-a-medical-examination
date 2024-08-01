import express from "express";
import homeController, { getHomePage } from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
const jwt = require('jsonwebtoken');
let router = express.Router();


// function authenticateToken(role) {
//   return (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401); // Nếu không có token, trả về 401 Unauthorized
//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403); // Nếu token không hợp lệ, trả về 403 Forbidden
//       if (role && user.role !== role) {
//         return res.sendStatus(403); // Nếu vai trò không khớp, trả về 403 Forbidden
//       req.user = user; // Gắn thông tin người dùng vào req
//       next(); // Tiếp tục middleware tiếp theo
//     });
//   };
// }


let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD); //tao user
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD); //hien thi
  router.get("/edit-crud", homeController.getEditCRUD); //
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCURD);

  // authenticateToken("2"),

  //user controller api
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  //doctor
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors)
  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);

  router.get("/api/get-detail-doctor", doctorController.getDetailDoctorById);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-doctor", doctorController.getScheduleByDate);
  router.get("/api/get-extra-infor-doctor-by-id", doctorController.getInforDoctorById);
  router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

  //patient booking
  router.post("/api/patient-book-appointmnet", patientController.postBookAppointment);
  router.post("/api/verify-book-appointmnet", patientController.postVerifyBookAppointment);

  //specialty
  router.post('/api/create-new-specialty', specialtyController.createSpecialty)
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);


  return app.use("/", router);
};
module.exports = initWebRoutes;
