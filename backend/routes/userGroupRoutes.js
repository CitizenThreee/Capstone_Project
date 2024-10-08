let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

// Routes for userGroups
router.post('/', (req, res) => {
    Controllers.userGroupController.createUserGroup(req, res);
})

router.get('/user', (req, res) => {
    Controllers.userGroupController.getUserGroup(req, res);
})

router.get('/users/:groupId', (req, res) => {
    Controllers.userGroupController.getGroupUsers(req, res);
})
router.get('/users/pending/:groupId', (req, res) => {
    Controllers.userGroupController.getPendingGroupUsers(req, res);
})

router.get('/groupsIds', (req, res) => {
    Controllers.userGroupController.getUserGroupsIds(req, res);
})

router.get('/groups', (req, res) => {
    Controllers.userGroupController.getUserGroups(req, res);
})

router.delete('/:userGroupId', (req, res) => {
    Controllers.userGroupController.deleteUserGroup(req, res);
})
 
router.put('/:userGroupId', (req, res) => {
    Controllers.userGroupController.updateUserGroup(req, res);
})

module.exports = router;