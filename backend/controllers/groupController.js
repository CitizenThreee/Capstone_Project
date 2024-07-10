"use strict";
const Models = require('../models');

const createGroup = (req, res) => {
    Models.Group(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const getGroup = (req, res) => {
    Models.Group.findById(req.params.groupId)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const getChildren = (req, res) => {
    Models.Group.find({ parentId: req.params.groupId })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const updateGroup = (req, res) => {
    Models.Group.findByIdAndUpdate(req.params.groupId, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const deleteGroup = (req, res) => {
    Models.Group.findByIdAndDelete(req.params.groupId)
        .then(() => res.send({ result: 200, data: "Group successfully deleted" }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
    
}

module.exports = { createGroup, getGroup, updateGroup, deleteGroup, getChildren }