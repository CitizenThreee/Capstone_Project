"use strict";
const Models = require('../models');

const createUserGroup = (req, res) => {
    Models.UserGroup(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const getUserGroup = (req, res) => {
    Models.UserGroup.findOne({ userId: req.query.userId, groupId: req.query.groupId })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const getGroupUsers = (req, res) => {
    Models.UserGroup.find({ groupId: req.params.groupId, status: 'approved' }).populate('userId')
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const getPendingGroupUsers = (req, res) => {
    Models.UserGroup.find({ groupId: req.params.groupId, status: 'pending' }).populate('userId')
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const getUserGroupsIds = (req, res) => {
    Models.UserGroup.find({ userId: req.query.userId, status: 'approved' })
        .then(data => res.send({ result: 200, data: data.map(group => group.groupId)}))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const getUserGroups = (req, res) => {
    Models.UserGroup.find({ userId: req.query.userId }).populate('groupId').lean()
        .then(data => {
            const userGroup = data.map(userGroup => userGroup.groupId)
            res.send({ result: 200, data: userGroup })
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const updateUserGroup = (req, res) => {
    Models.UserGroup.findByIdAndUpdate(req.params.userGroupId, req.body, { new: true }).populate('userId')
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const deleteUserGroup = (req, res) => {
    Models.UserGroup.findByIdAndDelete(req.params.userGroupId)
        .then(() => res.send({ result: 200, data: "User group successfully deleted" }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = { createUserGroup, getUserGroup, updateUserGroup, deleteUserGroup, getUserGroups, getGroupUsers, getUserGroupsIds, getPendingGroupUsers }