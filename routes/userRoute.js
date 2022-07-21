const express = require('express');
const router = express.Router();
const {registrasiUser, loginUser, getUser} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

// registrasi user
router.post('/', registrasiUser);

// login user
router.post('/login', loginUser);

// get user
router.get('/',protect, getUser);

module.exports = router;