let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

// Routes for tabs
router.post('/', (req, res) => {
    Controllers.tabController.createTab(req, res);
})

router.get('/group/:groupId', (req, res) => {
    Controllers.tabController.getTabs(req, res);
})

router.get('/:tabId', (req, res) => {
    Controllers.tabController.getTab(req, res);
})

router.delete('/:tabId', (req, res) => {
    Controllers.tabController.deleteTab(req, res);
})
 
router.put('/:tabId', (req, res) => {
    Controllers.tabController.updateTab(req, res);
})

module.exports = router;