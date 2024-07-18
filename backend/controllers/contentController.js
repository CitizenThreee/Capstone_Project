"use strict";
const Models = require('../models');
const HTTPResponseHandler = require('../libraries/HTTPResponseHandler')
const http = new HTTPResponseHandler();

// Creates new content data
const createContent = (req, res) => {
    Models.Content(req.body).save()
        .then(data => {
            if(data) http.Created(res, data);
            else http.BadRequest(res, 'Create request contained incorrect data')
        })
        .catch(err => res.send({ result: 500, error: err.message }))
}

// Gets all content from a specified tab
const getTabContent = (req, res) => {
    Models.Content.find({ parentId: req.params.parentId, status: 'approved' })
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
            })
        .catch(err => http.ServerError(res, err))
}

// Gets all group content requests
const getGroupRequests = (req, res) => {
    Models.Content.find({ groupId: req.params.groupId, status: "pending" })
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Gets a specific content's data based on the content's id
const getContent = (req, res) => {
    Models.Content.findById(req.params.contentId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Updates a content's data based on the content's id
const updateContent = (req, res) => {
    Models.Content.findByIdAndUpdate(req.params.contentId, req.body, { new: true }).lean()
        .then(data => {
            if(newData) http.OK(res, data);
            else http.BadRequest(res, 'No data found');
        })
        .catch(err => http.ServerError(res, err))
}

// Deletes a content's data based on the content's id
const deleteContent = (req, res) => {
    Models.Content.findByIdAndDelete(req.params.contentId)
        .then(data => {
            if(data) http.OK(res, data);
            else http.BadRequest(res, 'Error when deleting')
        })
        .catch(err => http.ServerError(res, err))
}

module.exports = { createContent, getContent, getTabContent, updateContent, deleteContent, getGroupRequests }