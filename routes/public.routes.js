const express = require('express');
const router = express.Router();
const homeController = require('@controllers/home.index.controller');
const authController = require('@controllers/auth.index.controller');

router.get('/', homeController.homeRender);
router.get('/login', authController.loginRender);
router.get('/register', authController.registerRender);
router.get('/forgot-password', authController.forgotPasswordRender);
router.get('/change-password', authController.changePasswordRender);
router.get('/confirm-account/:token', authController.confirmRender);


module.exports = router;
