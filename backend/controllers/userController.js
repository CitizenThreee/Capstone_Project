"use strict";
const Validation = require('../libraries/Validation');
const Models = require('../models');
const HTTPResponseHandler = require('../libraries/HTTPResponseHandler')
const http = new HTTPResponseHandler();
const validation = new Validation();

// Returns the user's data if a user with matching email and password pair are found
const signin = (req, res) => {
    if(!req.body.email || !req.body.password) http.BadRequest(res, 'Request needs email and password')

    Models.User.findOne({ email: req.body.email.toLowerCase(), password: req.body.password }, { password: 0 })
        .then(data => {
            if(data) http.OK(res, data);
            else if (data == null) http.NotFound(res, 'User not found')
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Creates a user
const createUser = (req, res) => {
    const valid = validation.ValidateSignUp(req.body);

    if(valid.passed){
        const newUser = {...req.body, email: req.body.email.toLowerCase()}
        Models.User(newUser).save()
            .then(data => {
                if(data) http.Created(res, data)
                else http.BadRequest(res, 'Error when creating')
            })
            .catch(err => http.ServerError(res, err))
    }
    else{
        http.BadRequest(res, 'User input incorrect')
    }
}

/*const getGroupUsers = (req, res) => {
    Models.User.find({ groupId: req.query.groupId, userId: req.query.userId })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => http.ServerError(res, err))
}*/

// Gets a specific user
const getUser = (req, res) => {
    Models.User.findById(req.params.userId, { password: 0 })
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Updates a specific user
const updateUser = (req, res) => {
    Models.User.findByIdAndUpdate(req.params.userId, req.body, { new: true }).lean()
        .then(data => {
            try {
                const { password, ...newData } = data;
                if(newData) http.OK(res, newData);
                else http.BadRequest(res, 'No data found');
            }
            catch{
                http.NotFound(res, 'User not found');
            }
        })
        .catch(err => http.ServerError(res, err))
}

// Deletes a specific user
const deleteUser = (req, res) => {
    Models.User.findByIdAndDelete(req.params.userId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'Error when deleting');
        })
        .catch(err => http.ServerError(res, err))
}

module.exports = { signin, createUser, getUser, deleteUser, updateUser }