const express = require('express');
const router = express.Router();
const { authorization, doRegistration, authentification } = require('../controller/user.constroller');
const { authenticateToken } = require('../middleware/tokenValidator');
const { getChats, createChat } = require('../controller/chat.controller');

router.post('/registration', doRegistration);
router.post(`/authorize`, authorization);
router.get('/auth',authenticateToken, authentification);

router.get('/chat', authenticateToken, getChats);
router.post('/chat', authenticateToken, createChat);
//router.post('`/chat', authenticateToken, addMessage);


module.exports = router;