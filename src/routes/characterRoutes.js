const express = require('express');
const router = express.Router();
const { createCharacters, getCharacters, getRandomCharacterEndpoint } = require('../controllers/characterController');
const protectAdmin = require('../middleware/authMiddleware');

router.post('/', protectAdmin, createCharacters);
router.get('/', getCharacters);
router.get('/random-character', getRandomCharacterEndpoint);

 
module.exports = router;
