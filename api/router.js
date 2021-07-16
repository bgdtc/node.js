//MODULES ---------------------------------------------------------
const express = require('express'),
       router = express.Router(),
       upload = require('./middleware/multer')

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
    nodeMailerController = require('./controllers/nodemailerController'),
    cguController = require('./controllers/cgu'),
    cookiesController = require('./controllers/cookiesController')
    

const userController = require('./controllers/userController')
const nmap = require('./middleware/nmapIpVisitor')
const is_admin = require('./middleware/is_admin')


 
//ROUTES\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//


//COOKIES
router.route('/cookies')
    .get(cookiesController.activateCookies)

//CGU
router.route('/CGU')
    .get( cguController.get)

//404 
router.route('/404')
    .get(errorController.get)

//MENTIONS LEGALES -------------------------------------------------
router.route('/mentions_legales')
    .get(mentionLegalesController.get)
    
    
//HOME -------------------------------------------------------------
router.route('/')
    .get(homeController.get)


//ARTICLE ----------------------------------------------------------
router.route('/blog')
    .get(blogController.getBlog)
    


//ARTICLE ID CRUD GET COMMENT ADD COMMENT DELETE ARTICLE AND MODIFY ARTICLE -------------------------------------------------------
router.route('/article/:id')
    .get(blogController.getID, commentController.getComment)
    .delete(is_admin, articleController.deleteArticleById)
    .put(is_admin, upload.single('image'),articleController.modifyArticle)
    .post(articleController.addComment)


//CONTACT ----------------------------------------------------------

router.route('/contact')
    .get(contactController.get)
    .post(contactController.sendContact)


//EDIT PASSWORD POST MODIF PASSWORD
router.route('/editPassword/:id')
    .post(authController.editPasswordPost)

//VERIFYID VERIF EMAIL BTN ET POST
router.route('/verify/:id')
    .get(authController.verifAccount)
    .post(authController.verifAccountPost)

//AVIS & POSTER UN AVIS -------------------------------------------------------------
router.route('/avis')
    .get(avisController.get)
    .post(avisController.postAvis)


//COMMENTS DELETE COMMENT ET MODIFY COMMENT ---------------------------------------------------------
router.route('/comment/:id')
    .delete(commentController.deleteCommentById)
    .put(commentController.modifyComment)

//MON COMPTE -------------------------------------------------------
router.route('/account')
   .get(accountController.get)


//MON COMPTE ID USER MODIFY ACCOUNT -------------------------------------------------
router.route('/account/user/:id')
   .get(accountController.get)
   .put(upload.single('image'), accountController.modifyAccount)

   
//MON COMPTE ID COMMENTS& AVIS MODIFY AND DELETE
router.route('/account/:id')
    .put(accountController.modifyComment)
    .delete(accountController.deleteCommentById)


//FLUX RSS ---------------------------------------------------------
router.route('/feed')
   .get(feedController.get)

//ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN


//ADMIN PANEL ------------------------------------------------------   
router.route('/admin')
    .get(nmap,is_admin, adminController.get)


//ARTICLE ADMIN ADD ARTICLE ----------------------------------------------------
router.route('/article')
    .post(is_admin, upload.single('image'), articleController.addArticle)


//USER ID MODIFY ET DELETE ---------------------------------------------------------
router.route('/user/:id')
    .delete(is_admin, userController.deleteUserById)
    .put(is_admin, userController.modifyUser)
  

//USER ADD USER  ------------------------------------------------------------
router.route('/user/add')
    .post(is_admin, userController.addUser)



//AUTH AUTH AUTH AUTH AUTH AUTH AUTH

// //AUTH LOGIN -------------------------------------------------------
router.route('/auth')
    .get(authController.get)
    .post(authController.auth)


// //AUTH REGISTER ----------------------------------------------------
router.route('/auth/register')
    .post(authController.register)


// //AUTH LOST PASSWORD SEND MAIL -----------------------------------------------
router.route('/auth/lost_pwd')
    .post(nodeMailerController.lostPassword)

// //AUTH LOST PWD PAGE MODIFY PASSWORD 
router.route('/auth/lost_pwd/:id')
    .get(nodeMailerController.editPassword)

//LOGOUT
router.route('/logout')
    .get(authController.logout)



//MESSAGES
router.route('/messages/:id')
   .delete(adminController.deleteMessage)

//MESSAGE ID
router.route('/messages')
   .post(is_admin, adminController.sendMessage)     


    
//EXPORT SERVER.JS -------------------------------------------------
module.exports = router;



