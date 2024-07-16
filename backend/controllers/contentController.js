"use strict";
const Models = require('../models');

const createContent = (req, res) => {
    Models.Content(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const getTabContent = (req, res) => {
    Models.Content.find({ parentId: req.params.parentId, status: 'approved' })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const getGroupRequests = (req, res) => {
    Models.Content.find({ groupId: req.params.groupId, status: "pending" })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message})
        })
}

const getContent = (req, res) => {
    Models.Content.findById(req.params.contentId)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const updateContent = (req, res) => {
    Models.Content.findByIdAndUpdate(req.params.contentId, req.body, { new: true }).lean()
        .then(data => {
            const { password, ...newData } = data;
            res.send({ result: 200, data: newData })
        })
        .catch(err => res.send({ result: 500, error: err.message }))
}

const deleteContent = (req, res) => {
    Models.Content.findByIdAndDelete(req.params.contentId)
        .then(() => res.send({ result: 200, data: "Content data successfully deleted" }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = { createContent, getContent, getTabContent, updateContent, deleteContent, getGroupRequests }