"use strict";
const Models = require('../models');
const HTTPResponseHandler = require('../libraries/HTTPResponseHandler')
const http = new HTTPResponseHandler();

// Creates a group
const createGroup = (req, res) => {
    Models.Group(req.body).save()
        .then(data => {
            if(data) http.Created(res, data)
            else http.BadRequest(res, 'Error when creating')
        })
        .catch(err => http.ServerError(res, err))
}

// Gets a specific group
const getGroup = (req, res) => {
    Models.Group.findById(req.params.groupId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Gets all groups
const getGroups = (req, res) => {
    Models.Group.find()
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Gets all children of a specific group
const getChildren = (req, res) => {
    Models.Group.find({ parentId: req.params.groupId })
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Updates a specific group
const updateGroup = (req, res) => {
    Models.Group.findByIdAndUpdate(req.params.groupId, req.body, { new: true })
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Deletes a specific group
const deleteGroup = (req, res) => {
    Models.Group.findByIdAndDelete(req.params.groupId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'Error when deleting')
        })
        .catch(err => http.ServerError(res, err))
    
}

module.exports = { createGroup, getGroup, updateGroup, deleteGroup, getChildren, getGroups }