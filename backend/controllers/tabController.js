"use strict";
const Models = require('../models');
const HTTPResponseHandler = require('../libraries/HTTPResponseHandler')
const http = new HTTPResponseHandler();

// Creates a tab
const createTab = (req, res) => {
    Models.Tab(req.body).save()
        .then(data => {
            if(data) http.Created(res, data)
            else http.BadRequest(res, 'Error when creating')
        })
        .catch(err => res.send({ result: 500, error: err.message }))
}

// Gets all tabs in a specific group
const getTabs = (req, res) => {
    Models.Tab.find({ groupId: req.params.groupId })
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Gets a specific tab
const getTab = (req, res) => {
    Models.Tab.findById(req.params.tabId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Updates a specific tab
const updateTab = (req, res) => {
    Models.Tab.findByIdAndUpdate(req.params.tabId, req.body, { new: true }).lean()
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Deletes a specific tab
const deleteTab = (req, res) => {
    Models.Tab.findByIdAndDelete(req.params.tabId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'Error when deleting');
        })
        .catch(err => http.ServerError(res, err))
}

module.exports = { createTab, getTabs, getTab, updateTab, deleteTab }