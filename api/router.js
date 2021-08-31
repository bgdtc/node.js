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
    robot = require('./controllers/robot'),
    cookiesController = require('./controllers/cookiesController')
    

// MIDDLEWARES
const userController = require('./controllers/userController')
const nmap = require('./middleware/nmapIpVisitor')
const is_admin = require('./middleware/is_admin')
const is_user_not_banned_and_verified = require ('./middleware/is_user_not_banned_and_verified')
const csrfProtection = require('./middleware/_csrf')



 
//ROUTES\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//


//COOKIES
router.route('/cookies')
    .get(csrfProtection, cookiesController.activateCookies)

//CGU
router.route('/CGU')
    .get(cguController.get)

//404 
router.route('/404')
    .get(errorController.get)

//MENTIONS LEGALES -------------------------------------------------
router.route('/mentions_legales')
    .get(mentionLegalesController.get)
    
    
//HOME -------------------------------------------------------------
router.route('/')
    .get(csrfProtection, homeController.get)


//ARTICLE ----------------------------------------------------------
router.route('/blog')
    .get(is_user_not_banned_and_verified, blogController.getBlog)
    


//ARTICLE ID CRUD GET COMMENT ADD COMMENT DELETE ARTICLE AND MODIFY ARTICLE -------------------------------------------------------
router.route('/article/:id')
    .get(is_user_not_banned_and_verified, blogController.getID, commentController.getComment)
    .delete(is_admin, articleController.deleteArticleById)
    .put(is_admin, upload.single('image'),articleController.modifyArticle)
    .post(is_user_not_banned_and_verified, articleController.addComment)


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
    .post(is_user_not_banned_and_verified, avisController.postAvis)


//COMMENTS DELETE COMMENT ET MODIFY COMMENT ---------------------------------------------------------
router.route('/comment/:id')
    .delete(is_user_not_banned_and_verified, accountController.deleteCommentById)
    .put(is_user_not_banned_and_verified, accountController.modifyComment)

//MON COMPTE -------------------------------------------------------
router.route('/account')
   .get(is_user_not_banned_and_verified, accountController.get)
   

//MON COMPTE ID USER MODIFY ACCOUNT -------------------------------------------------
router.route('/account/user/:id')
   .get(is_user_not_banned_and_verified, accountController.get)
   .put(is_user_not_banned_and_verified, upload.single('image'), accountController.modifyAccount)
   .delete(is_user_not_banned_and_verified, accountController.deleteAccount)
   
//MON COMPTE ID COMMENTS& AVIS MODIFY AND DELETE
router.route('/account/:id')
    .put(is_user_not_banned_and_verified, accountController.modifyComment)
    .delete(is_user_not_banned_and_verified, accountController.deleteCommentById)


//FLUX RSS ---------------------------------------------------------
router.route('/feed')
   .get(is_user_not_banned_and_verified, feedController.get)

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
    .get(is_user_not_banned_and_verified, authController.logout)



//MESSAGES
router.route('/messages/:id')
   .delete(is_admin, adminController.deleteMessage)

//MESSAGE ID
router.route('/messages')
   .post(is_admin, adminController.sendMessage)     


router.route('/robots.txt')
    .get(robot.getRobot)
    
//EXPORT SERVER.JS -------------------------------------------------
module.exports = router;


// $$$$$$$\   $$$$$$\  $$$$$$$\ $$$$$$$$\  $$$$$$\  
// $$  __$$\ $$  __$$\ $$  __$$\\__$$  __|$$  __$$\ 
// $$ |  $$ |$$ /  \__|$$ |  $$ |  $$ |   $$ /  \__|
// $$$$$$$\ |$$ |$$$$\ $$ |  $$ |  $$ |   $$ |      
// $$  __$$\ $$ |\_$$ |$$ |  $$ |  $$ |   $$ |      
// $$ |  $$ |$$ |  $$ |$$ |  $$ |  $$ |   $$ |  $$\ 
// $$$$$$$  |\$$$$$$  |$$$$$$$  |  $$ |   \$$$$$$  |
// \_______/  \______/ \_______/   \__|    \______/ 
                                                 
             



