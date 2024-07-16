"use strict";
const Models = require('../models');

const createTab = (req, res) => {
    Models.Tab(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}

const getTabs = (req, res) => {
    Models.Tab.find({ groupId: req.params.groupId })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const getTab = (req, res) => {
    Models.Tab.findById(req.params.tabId)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const updateTab = (req, res) => {
    Models.Tab.findByIdAndUpdate(req.params.tabId, req.body, { new: true }).lean()
        .then(data => {
            const { password, ...newData } = data;
            res.send({ result: 200, data: newData })
        })
        .catch(err => res.send({ result: 500, error: err.message }))
}

const deleteTab = (req, res) => {
    Models.Tab.findByIdAndDelete(req.params.tabId)
        .then(() => res.send({ result: 200, data: "Tab data successfully deleted" }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = { createTab, getTabs, getTab, updateTab, deleteTab }