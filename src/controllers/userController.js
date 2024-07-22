import userService from "../services/userService";
import { createNewUser } from "../server";
const jwt = require('jsonwebtoken');

function generateAccessToken(info) {
  console.log(info)
  return jwt.sign(info, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email)
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing input parameter",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  //compare password
  //return userinfo
  //access_token: jwt (json web token)
  return res.status(200).json({
    user: userData.data,
    jwtToken: generateAccessToken({
      email: userData.user.email,
      role: userData.user.roleId,
    }),
    errCode: userData.errCode,
    message: userData.errMessage,
    // user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  // let id = req.query.id; //all, id
  // console.log(req)
  // if (!id) {
  //   return res.status(200).json({
  //     errCode: 1,
  //     errMessage: "Missing requierd parameters",
  //     users: [],
  //   });
  // }

  let users = await userService.getAllUsers("All");

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  // console.log(message);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data)

  } catch (e) {
    console.log('gett allcode error:', e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'error from server'
    })
  }
}

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
