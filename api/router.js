//MODULES ---------------------------------------------------------
const express = require('express'),

    router = express.Router(),


//CONTROLLEURS ----------------------------------------------------
    homeController = require('./controllers/homeController'),
    blogController = require('./controllers/blogController'),
    contactController = require('./controllers/contactController'),
    adminController = require('./controllers/adminController'),
    authController = require('./controllers/authController'),
    avisController = require('./controllers/avisController'),
    feedController = require('./controllers/feedController'),
    accountController = require('./controllers/accountController'),
    idController = require('./controllers/idController'),
    mentionLegalesController = require('./controllers/mentionLegales')


//?????? -----------------------------------------------------------
const userController = require('./controllers/userController')

//MIDDLEWARE NMAP TROP PUISSANNNNNT --------------------------------
const nmap = require('./middleware/nmapIpVisitor')
 
//ROUTES\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//

//MENTIONS LEGALES -------------------------------------------------
router.route('/mentions_legales')
    .get(mentionLegalesController.get)


//USER ??? ---------------------------------------------------------
router.route('/user/:id')
    .delete(userController.deleteUserById)
  

//HOME -------------------------------------------------------------
router.route('/')
    .get(nmap, homeController.get)


//ARTICLE ----------------------------------------------------------
router.route('/blog')
    .get(blogController.get)
    

//ARTICLE ID -------------------------------------------------------
router.route('/article/:id')
    .get(blogController.getID)


//CONTACT ----------------------------------------------------------

router.route('/contact')
    .get(contactController.get)


//AUTH LOGIN -------------------------------------------------------

router.route('/auth')
    .get(authController.get)
    .post(authController.auth)


//AUTH REGISTER ----------------------------------------------------
router.route('/auth/register')
    .post(authController.register)


//AUTH LOST PASSWORD -----------------------------------------------
router.route('/auth/lost_pwd')
    .post(authController.lostPassword)


//AVIS -------------------------------------------------------------
router.route('/avis')
    .get(avisController.get)


//MON COMPTE -------------------------------------------------------
router.route('/account')
   .get(accountController.get)


//FLUX RSS ---------------------------------------------------------
router.route('/feed')
   .get(feedController.get)


//ADMIN PANEL ------------------------------------------------------   
router.route('/admin')
    .get(adminController.get)

//EXPORT SERVER.JS -------------------------------------------------

module.exports = router;
