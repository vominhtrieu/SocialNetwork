const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const postController = require('../controllers/post');

router.post('/newpost', checkAuth, postController.addNewPost);
router.get('/:id/posts', checkAuth, postController.getUserPost);
router.get('/post/:id', checkAuth, postController.getPost);
router.get('/feed', checkAuth, postController.getFeed);

module.exports = router;
