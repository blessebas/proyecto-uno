const express = require('express');
const router = express.Router();
const homeController = require('@controllers/home.index.controller');

router.get('/', homeController.homeRender);


module.exports = router;
