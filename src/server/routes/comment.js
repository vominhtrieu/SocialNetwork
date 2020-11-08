const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/comment', checkAuth, commentController.postComment);
router.get('/comment/:id', checkAuth, commentController.getComment);
router.get('/:postId/comments', checkAuth, commentController.getCommentsInPost);

module.exports = router;
