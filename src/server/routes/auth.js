const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signin', authController.signIn);

router.post('/signup', authController.signUp);

router.post('/signout', checkAuth, authController.signOut);

module.exports = router;
