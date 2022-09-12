const express = require('express');
const router = express.Router();

//import user controller and model
const userController = require('../controller/users');
const UserModel = require('../model/user');
const auth = require("../middleware/auth");

//define user routes
router.get('/register', userController.registrationForm);
router.post('/register', userController.registerUsers);
router.get('/login', userController.loginForm);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/list', userController.listUsers);
router.get('/delete/:user_id', auth,userController.deleteUser);
router.get('/edit/:user_id',auth, userController.editUser);
router.post('/update', auth,userController.updateUser);

module.exports = router;
