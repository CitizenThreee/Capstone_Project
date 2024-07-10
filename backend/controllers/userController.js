"use strict";
const ValidateUser = require('../libraries/ValidateUser');
const Models = require('../models');

const signin = (req, res) => {
    Models.User.findOne({ email: req.body.email.toLowerCase(), password: req.body.password }, { password: 0 })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const createUser = (req, res) => {
    const validation = ValidateUser(req.body);
    if(validation.passed){
        const newUser = {...req.body, email: req.body.email.toLowerCase()}
        Models.User(newUser).save()
            .then(data => res.send({ result: 200, data: data }))
            .catch(err => res.send({ result: 500, error: err.message }))
    }
}

const getGroupUsers = (req, res) => {
    Models.User.find({ groupId: req.query.groupId, userId: req.query.userId })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const getUser = (req, res) => {
    Models.User.findById(req.params.userId, { password: 0 })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const updateUser = (req, res) => {
    Models.User.findByIdAndUpdate(req.params.userId, req.body, { new: true }).lean()
        .then(data => {
            const { password, ...newData } = data;
            res.send({ result: 200, data: newData })
        })
        .catch(err => res.send({ result: 500, error: err.message }))
}

const deleteUser = (req, res) => {
    Models.User.findByIdAndDelete(req.params.userId)
        .then(() => res.send({ result: 200, data: "User data successfully deleted" }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = { signin, createUser, getGroupUsers, getUser, deleteUser, updateUser }