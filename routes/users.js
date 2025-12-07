const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { getPreferences, updatePreferences } = require('../controllers/preferencesController');
const { authenticateToken } = require('../middleware/auth');
const { validateSignup, validateLogin, validatePreferences } = require('../middleware/validation');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/preferences', authenticateToken, getPreferences);
router.put('/preferences', authenticateToken, validatePreferences, updatePreferences);

module.exports = router;

