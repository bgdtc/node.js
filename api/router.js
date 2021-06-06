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
    avisController = require('./controllers/avisController')

// MIddleware
const nmap = require('./middleware/nmapIpVisitor')
//router 


//home 

router.route('/')
    .get(nmap, homeController.get)

//article

router.route('/blog')
    .get(blogController.get)

//contact

router.route('/contact')
    .get(contactController.get)


//signup


router.route('/auth')
    .get(authController.get)


//avis

router.route('/avis')
    .get(avisController.get)


//admin


router.route('/admin')
    .get(adminController.get)

//export to server.js

module.exports = router;
