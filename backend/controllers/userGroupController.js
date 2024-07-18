"use strict";
const Models = require('../models');
const HTTPResponseHandler = require('../libraries/HTTPResponseHandler')
const http = new HTTPResponseHandler();

// Creates a userGroup
const createUserGroup = (req, res) => {
    Models.UserGroup(req.body).save()
        .then(data => {
            if(data) http.Created(res, data)
            else http.BadRequest(res, 'Error when creating')
        })
        .catch(err => http.ServerError(res, err))
}

// Gets a user group based off the user and group ids
const getUserGroup = (req, res) => {
    Models.UserGroup.findOne({ userId: req.query.userId, groupId: req.query.groupId })
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Gets all users in a group with an approved status
const getGroupUsers = (req, res) => {
    Models.UserGroup.find({ groupId: req.params.groupId, status: 'approved' }).populate('userId')
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Gets all users with a pending status for a specific group
const getPendingGroupUsers = (req, res) => {
    Models.UserGroup.find({ groupId: req.params.groupId, status: 'pending' }).populate('userId')
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Get all groupIds from a specific user
const getUserGroupsIds = (req, res) => {
    Models.UserGroup.find({ userId: req.query.userId, status: 'approved' })
        .then(data => {
            if(data) http.OK(res, data.map(group => group.groupId));
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Gets all groups from a specific user
const getUserGroups = (req, res) => {
    Models.UserGroup.find({ userId: req.query.userId }).populate('groupId').lean()
        .then(data => {
            if(data) http.OK(res, data.map(userGroup => userGroup.groupId));
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Updates a specific userGroup
const updateUserGroup = (req, res) => {
    Models.UserGroup.findByIdAndUpdate(req.params.userGroupId, req.body, { new: true }).populate('userId')
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Deletes a specific userGroup
const deleteUserGroup = (req, res) => {
    Models.UserGroup.findByIdAndDelete(req.params.userGroupId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'Error when deleting');
        })
        .catch(err => http.ServerError(res, err))
}

module.exports = { createUserGroup, getUserGroup, updateUserGroup, deleteUserGroup, getUserGroups, getGroupUsers, getUserGroupsIds, getPendingGroupUsers }