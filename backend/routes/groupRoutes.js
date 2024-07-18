let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

// Routes for groups
router.post('/create', (req, res) => {
    Controllers.groupController.createGroup(req, res);
})

router.get('/children/:groupId', (req, res) => {
    Controllers.groupController.getChildren(req, res);
})

router.get('/', (req, res) => {
    Controllers.groupController.getGroups(req, res);
})

router.get('/:groupId', (req, res) => {
    Controllers.groupController.getGroup(req, res);
})

router.delete('/:groupId', (req, res) => {
    Controllers.groupController.deleteGroup(req, res);
})

router.put('/:groupId', (req, res) => {
    Controllers.groupController.updateGroup(req, res);
})

module.exports = router;