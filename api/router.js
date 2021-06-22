//Import modules

const express = require('express'),
    router = express.Router(),
    path = require('path')

//Controlleurs
const homeController = require('./controllers/homeController'),
    blogController = require('./controllers/blogController'),
    contactController = require('./controllers/contactController'),
    adminController = require('./controllers/adminController'),
    authController = require('./controllers/authController'),
    avisController = require('./controllers/avisController'),
    feedController = require('./controllers/feedController'),
    accountController = require('./controllers/accountController'),
    idController = require('./controllers/idController'),
    mentionLegalesController = require('./controllers/mentionLegales')


//db controller
const userController = require('./controllers/userController')

// MIddleware
const nmap = require('./middleware/nmapIpVisitor')
//router 

//mentions légales

router.route('/mentions_legales')
    .get(mentionLegalesController.get)
//user 

router.route('/user')
    .get(userController.get)
  

 

//home 

router.route('/')
    .get(nmap, homeController.get)

//article

router.route('/blog')
    .get(blogController.get)
    

router.route('/article/:id')
    .get(blogController.getID)

//contact

router.route('/contact')
    .get(contactController.get)



//login

router.route('/auth')
    .get(authController.get)
    .post(authController.auth)

//register

router.route('/auth/register')
    .post(authController.register)

//lostpassword

router.route('/auth/lost_pwd')
    .post(authController.lostPassword)
//avis

router.route('/avis')
    .get(avisController.get)



// account
router.route('/account')
   .get(accountController.get)
//feed

router.route('/feed')
   .get(feedController.get)




router.route('/admin')
    .get(adminController.get)

//export to server.js

module.exports = router;
