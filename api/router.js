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
    mentionLegalesController = require('./controllers/mentionLegales'),
    commentController = require('./controllers/commentController'),
    articleController = require('./controllers/articleController')


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
    .put(userController.modifyUser)
  

//USER  ------------------------------------------------------------
router.route('/user/add')
    .post(userController.addUser)
    
    
//HOME -------------------------------------------------------------
router.route('/')
    .get(nmap, homeController.get)


//ARTICLE ----------------------------------------------------------
router.route('/blog')
    .get(blogController.get)
    

//ARTICLE ADMIN ----------------------------------------------------
router.route('/article')
    .post(articleController.addArticle)


//ARTICLE ID -------------------------------------------------------
router.route('/article/:id')
    .get(blogController.getID)
    .delete(articleController.deleteArticleById)
    .put(articleController.modifyArticle)

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
