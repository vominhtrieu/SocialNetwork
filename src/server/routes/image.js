const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const upload = require('../services/fileUpload');
const imageController = require('../controllers/image');

router.post('/avatar', checkAuth, upload.single('avatar'), imageController.uploadAvatar);
router.post('/cover', checkAuth, imageController.uploadCover);
router.get('/image/:id', checkAuth, imageController.getImage);

module.exports = router;
