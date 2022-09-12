var express = require('express');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const {getAuth} = require("./utils");
const bcrypt = require('bcrypt');

const registerUsers = async (req, res, next) => {

    //get user submitted data
    const {fullname, email, password} = req.body

    // check if user enters all data
    if (!(email && password && fullname)) {
        res.status(400).send("Please complete all fields")
    }

    // check if user already exist
    // search for user in database
    const existingUser = await UserModel.findOne({ email })

    //if user already exists then respond with error message
    if (existingUser) {
        return res.status(409).send("A user with this email already exists")
    }

    //Encrypt the user password for better security
    encryptedPassword = await bcrypt.hash(password, 10);


    //add new user to user collection in database
    try{

        // Create user in our database
        const user = await UserModel.create({
                fullname: fullname,
                email: email.toLowerCase(),
                password: encryptedPassword,
                userType: 'user'
            }
        )

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // save user token
        user.token = token;

        let login = processLogin(email, password)

        //if login successful, then redirect to home page
        if(login){
            res.redirect('/')
        }
        //redirect to home page
        //res.redirect('/')

    }catch (error) {
        //display error in console
        console.log(error);
    }

}

const loginUser = async (req, res, next) => {

    //add new user to user collection in database
    try{

        //get user submitted data
        const {email, password} = req.body
        token = await processLogin(email, password)

        //if login successful, then redirect to home page
        if(token){
           res.redirect('/')
        }else{
            res.status(400).send("Invalid Username or password");
        }

    }catch (error) {
        //display error in console
        console.log(error);
    }

}


const processLogin = async (email, password) => {
    //add new user to user collection in database
    try{

        // check if user has provided email and password
        if (!(email && password)) {
            res.status(400).send("You must provided a valid email and password");
        }

        //find if user exists in database
        const user = await UserModel.findOne({
                email: email
            }
        )

        //encrypt password and compare with value in database
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            //set current user token in server-side localstorage
            localStorage.setItem('currentToken', token)

            if(user.userType == "admin"){
                //store admin user in localstorage
                localStorage.setItem('isAdmin', 1)
            }

            return token

        }else{
            return 0
        }

    }catch (error) {
        //display error in console
        console.log(error);
    }
}


const listUsers = async (req, res, next) => {

    try{
        //get all users from database
        const userData = await UserModel.find({})

        //show the user list page
        res.render('user-list', {
            title: 'User List',
            userData,
            auth: getAuth()
        });


    }catch (error) {
        //display error in console
        console.log(error);
    }

}

const registrationForm = async (req, res, next) => {

    try{
        //show the registration view page
        res.render('register', {
            title: 'User Registration',
            auth: getAuth()
        });

    }catch (error) {
        //display error in console
        console.log(error);
    }

}
const loginForm = async (req, res, next) => {

    try{
        //show the user login view page
        res.render('login', {
            title: 'User Login',
            auth: getAuth()
        });

    }catch (error) {
        //display error in console
        console.log(error);
    }

}
const logoutUser = async (req, res, next) => {

    try{
        //remove the token stored in localstorage
        localStorage.removeItem('currentToken')
        localStorage.removeItem('isAdmin')

        //redirect to home page
        res.redirect('/')

    }catch (error) {
        //display error in console
        console.log(error);
    }

}

const editUser = async function(req, res, next) {

    //get id of user to edit
    const user_id = req.params.user_id

    try{
        //get user wher _id = user_id
        const userData = await UserModel.find({
            _id: user_id
        })

        res.render('edit-user', {
            title: 'Edit User',
            userData: userData[0],
            auth: getAuth()
        });


    }catch (error) {
        //display error in console
        console.log(error);
    }


}

const deleteUser = async function(req, res, next){

    //get id of user to delete
    const user_id =  req.params.user_id;

    try{
        //delete user with id user_id
        const userData = await UserModel.deleteOne(
            {_id:user_id}
        )

        //redirect to user-list page
        res.redirect('/users/list')


    }catch (error) {
        //display error in console
        console.log(error);
    }

}

const updateUser = async function(req, res, next){

    //get user submitted data
    const {user_id, fullname, email, password} = req.body

    //add user to user collection
    try{

        const result = await UserModel.update({
                _id:user_id
            },
            {
                $set: {
                    fullname: fullname,
                    email: email,
                    password: password
                }
            }
        )

        //redirect to user list page
        res.redirect('/users/list')

    }catch (error) {
        //display error in console
        console.log(error);
    }

}

module.exports = {
    registerUsers,
    registrationForm,
    listUsers,
    loginUser,
    loginForm,
    logoutUser,
    deleteUser,
    editUser,
    updateUser
}
