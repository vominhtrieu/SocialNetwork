const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const searchController = require('../controllers/search');

router.get('/search', checkAuth, searchController.searchForUser);

module.exports = router;
