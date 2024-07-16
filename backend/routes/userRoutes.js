let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.post('/signin', (req, res) => {
    Controllers.userController.signin(req, res);
})

router.post('/', (req, res) => {
    Controllers.userController.createUser(req, res);
})

router.get('/getGroupUsers', (req, res) => {
    Controllers.userController.getGroupUsers(req, res);
})

router.get('/:userId', (req, res) => {
    Controllers.userController.getUser(req, res);
})

router.delete('/:userId', (req, res) => {
    Controllers.userController.deleteUser(req, res);
})

router.put('/:userId', (req, res) => {
    Controllers.userController.updateUser(req, res);
})

module.exports = router;