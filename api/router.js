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
    idController = require('./controllers/idController')


//db controller
const userController = require('./controllers/userController')
const bookController = require('./controllers/bookController')

// MIddleware
const nmap = require('./middleware/nmapIpVisitor')
//router 


//user 

router.route('/user')
    .get(userController.get)
  

//book 
router.route('/book')
 

//home 

router.route('/')
    .get(nmap, homeController.get)

//article

router.route('/blog')
    .get(userController.get, blogController.get)
    

router.route('/article/:id')
    .get(blogController.getID)

//contact

router.route('/contact')
    .get(contactController.get)


//signup


router.route('/auth')
    .get(authController.get)
    .post(authController.auth)


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
