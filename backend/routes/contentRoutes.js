let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

// Routes for content
router.post('/', (req, res) => {
    Controllers.contentController.createContent(req, res);
})

router.get('/tab/:parentId', (req, res) => {
    Controllers.contentController.getTabContent(req, res);
})

router.get('/pending/:groupId', (req, res) => {
    Controllers.contentController.getGroupRequests(req, res);
})

router.get('/:contentId', (req, res) => {
    Controllers.contentController.getContent(req, res);
})

router.delete('/:contentId', (req, res) => {
    Controllers.contentController.deleteContent(req, res);
})
 
router.put('/:contentId', (req, res) => {
    Controllers.contentController.updateContent(req, res);
})

module.exports = router;