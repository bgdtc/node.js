//Import modules

const express = require('express'),
    router = express.Router(),
    path = require('path')

//Controlleurs
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    contactController = require('./controllers/contactController'),
    adminController = require('./controllers/adminController'),
    signupController = require('./controllers/signupController')

// MIddleware
const nmap = require('./middleware/nmapIpVisitor')
//router 


//home 

router.route('/')
    .get(nmap, homeController.get)

//article

router.route('/article')
    .get(articleController.get)

//contact

router.route('/contact')
    .get(contactController.get)


//signup


router.route('/signup')
    .get(signupController.get)


//admin


router.route('/admin')
    .get(adminController.get)

//export to server.js

module.exports = router;
