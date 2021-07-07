//MODULES ---------------------------------------------------------
const express = require('express'),
       router_api = express.Router(),
       upload = require('./middleware/multer')

//CONTROLLEURS ----------------------------------------------------
    homeController = require('./controllers_api/homeController'),
    blogController = require('./controllers_api/blogController'),
    contactController = require('./controllers_api/contactController'),
    adminController = require('./controllers_api/adminController'),
    authController = require('./controllers_api/authController'),
    avisController = require('./controllers_api/avisController'),
    feedController = require('./controllers_api/feedController'),
    accountController = require('./controllers_api/accountController'),
    mentionLegalesController = require('./controllers_api/mentionLegales'),
    commentController = require('./controllers_api/commentController'),
    articleController = require('./controllers_api/articleController'),
    errorController = require('./controllers_api/404Controller'),
    nodeMailerController = require('./controllers_api/nodemailerController'),
    cguController = require('./controllers_api/cgu')

const userController = require('./controllers/userController')
const nmap = require('./middleware/nmapIpVisitor')
 
//ROUTES\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//


 
//CGU
router_api.route('/CGU')
    .get(cguController.get)

//404 
router_api.route('/404')
    .get(errorController.get)

//MENTIONS LEGALES -------------------------------------------------
router_api.route('/mentions_legales')
    .get(mentionLegalesController.get)
    
    
//HOME -------------------------------------------------------------
router_api.route('/')
    .get(nmap, homeController.get)


//ARTICLE ----------------------------------------------------------
router_api.route('/blog')
    .get(blogController.getBlog)
    


//ARTICLE ID CRUD GET COMMENT ADD COMMENT DELETE ARTICLE AND MODIFY ARTICLE -------------------------------------------------------
router_api.route('/article/:id')
    .get(blogController.getID, commentController.getComment)
    .delete(articleController.deleteArticleById)
    .put(upload.single('image'),articleController.modifyArticle)
    .post(articleController.addComment)


//CONTACT ----------------------------------------------------------

router_api.route('/contact')
    .get(contactController.get)
    .post(contactController.sendContact)


//EDIT PASSWORD POST MODIF PASSWORD
router_api.route('/editPassword/:id')
    .post(authController.editPasswordPost)

//VERIFYID VERIF EMAIL BTN ET POST
router_api.route('/verify/:id')
    .get(authController.verifAccount)
    .post(authController.verifAccountPost)

//AVIS & POSTER UN AVIS -------------------------------------------------------------
router_api.route('/avis')
    .get(avisController.get)
    .post(avisController.postAvis)


//COMMENTS DELETE COMMENT ET MODIFY COMMENT ---------------------------------------------------------
router_api.route('/comment/:id')
    .delete(commentController.deleteCommentById)
    .put(commentController.modifyComment)

//MON COMPTE -------------------------------------------------------
router_api.route('/account')
   .get(accountController.get)


//MON COMPTE ID USER MODIFY ACCOUNT -------------------------------------------------
router_api.route('/account/user/:id')
   .get(accountController.get)
   .put(upload.single('image'), accountController.modifyAccount)

   
//MON COMPTE ID COMMENTS& AVIS MODIFY AND DELETE
router_api.route('/account/:id')
    .put(accountController.modifyComment)
    .delete(accountController.deleteCommentById)


//FLUX RSS ---------------------------------------------------------
router_api.route('/feed')
   .get(feedController.get)

//ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN


//ADMIN PANEL ------------------------------------------------------   
router_api.route('/admin')
    .get(adminController.get)


//ARTICLE ADMIN ADD ARTICLE ----------------------------------------------------
router_api.route('/article')
    .post(upload.single('image'), articleController.addArticle)


//USER ID MODIFY ET DELETE ---------------------------------------------------------
router_api.route('/user/:id')
    .delete(userController.deleteUserById)
    .put(userController.modifyUser)
  

//USER ADD USER  ------------------------------------------------------------
router_api.route('/user/add')
    .post(userController.addUser)



//AUTH AUTH AUTH AUTH AUTH AUTH AUTH

// //AUTH LOGIN -------------------------------------------------------
router_api.route('/auth')
    .get(authController.get)
    .post(authController.auth)


// //AUTH REGISTER ----------------------------------------------------
router_api.route('/auth/register')
    .post(authController.register)


// //AUTH LOST PASSWORD SEND MAIL -----------------------------------------------
router_api.route('/auth/lost_pwd')
    .post(nodeMailerController.lostPassword)

// //AUTH LOST PWD PAGE MODIFY PASSWORD 
router_api.route('/auth/lost_pwd/:id')
    .get(nodeMailerController.editPassword)

//LOGOUT
router_api.route('/logout')
    .get(authController.logout)



//MESSAGES
router_api.route('/messages/:id')
   .delete(adminController.deleteMessage)

//MESSAGE ID
router_api.route('/messages')
   .post(adminController.sendMessage)     
    
//EXPORT SERVER.JS -------------------------------------------------
module.exports = router_api;



