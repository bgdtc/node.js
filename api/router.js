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
    mentionLegalesController = require('./controllers/mentionLegales'),
    commentController = require('./controllers/commentController'),
    articleController = require('./controllers/articleController'),
    errorController = require('./controllers/404Controller'),
    nodeMailerController = require('./controllers/nodemailerController')


//?????? -----------------------------------------------------------
const userController = require('./controllers/userController')

//MIDDLEWARE NMAP TROP PUISSANNNNNT --------------------------------
const nmap = require('./middleware/nmapIpVisitor')
 
//ROUTES\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//




//404 
router.route('/404')
    .get(errorController.get)

//MENTIONS LEGALES -------------------------------------------------
router.route('/mentions_legales')
    .get(mentionLegalesController.get)


//USER ??? ---------------------------------------------------------
router.route('/user/:id')
    .delete(userController.deleteUserById)
    .put(userController.modifyUser)
  

//USER  ------------------------------------------------------------
router.route('/user/add')
    .post(userController.addUser)
    
    
//HOME -------------------------------------------------------------
router.route('/')
    .get(nmap, homeController.get)


//ARTICLE ----------------------------------------------------------
router.route('/blog')
    .get(blogController.getBlog)
    

//ARTICLE ADMIN ----------------------------------------------------
router.route('/article')
    .post(articleController.addArticle)


//ARTICLE ID -------------------------------------------------------
router.route('/article/:id')
    .get(blogController.getID, commentController.getComment)
    .delete(articleController.deleteArticleById)
    .put(articleController.modifyArticle)
    .post(articleController.addComment)


//CONTACT ----------------------------------------------------------

router.route('/contact')
    .get(contactController.get)


// //AUTH LOGIN -------------------------------------------------------
router.route('/auth')
    .get(authController.get)
    .post(authController.auth)


// //AUTH REGISTER ----------------------------------------------------
router.route('/auth/register')
    .post(authController.register)


// //AUTH LOST PASSWORD -----------------------------------------------
router.route('/auth/lost_pwd')
    .post(nodeMailerController.lostPassword)

// //AUTH LOST PWD 2 
router.route('/auth/lost_pwd/:id')
    .get(nodeMailerController.editPassword)


//EDIT PASSWORD ROUTE
router.route('/editPassword/:id')
    .post(authController.editPasswordPost)


//AVIS -------------------------------------------------------------
router.route('/avis')
    .get(avisController.get)
    .post(avisController.postAvis)


//COMMENTS ---------------------------------------------------------
router.route('/comment/:id')
    .delete(commentController.deleteCommentById)
    .put(commentController.modifyComment)

//MON COMPTE -------------------------------------------------------
router.route('/account')
   .get(accountController.get)


//MON COMPTE ID USER -------------------------------------------------
router.route('/account/user/:id')
   .get(accountController.get)
   .put(accountController.modifyAccount)

   
//MON COMPTE ID
router.route('/account/:id')
    .put(accountController.modifyComment)
    .delete(accountController.deleteCommentById)


//FLUX RSS ---------------------------------------------------------
router.route('/feed')
   .get(feedController.get)


//ADMIN PANEL ------------------------------------------------------   
router.route('/admin')
    .get(adminController.get)


//LOGOUT
router.route('/logout')
    .get(authController.logout)
    
//EXPORT SERVER.JS -------------------------------------------------
module.exports = router;



