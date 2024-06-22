import express from "express";
import homeController, { getHomePage } from "../controllers/homeController";
import userController from "../controllers/userController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/me', homeController.getMe);
    router.get('/crud', homeController.getCRUD);//tao user

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD); //hien thi
    router.get('/edit-crud', homeController.getEditCRUD);//

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCURD);

    
    router.post('/api/login', userController.handleLogin);

    return app.use("/", router);
}
module.exports = initWebRoutes;