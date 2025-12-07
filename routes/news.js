const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/newsController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getNews);

module.exports = router;

