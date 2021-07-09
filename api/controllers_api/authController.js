// CONTROLLEUR D'IDENTIFICATION 



//IMPORT BCRYPT CHIFFREMENT DÉCHIFREMENT DU MOT DE PASSE 
const bcrypt = require('bcrypt')


//IMPORT DOTENV POUR LA CONFIG NODEMAILER
require('dotenv').config()


//IMPORT NODEMAILER POUR LA GESTION DES MAILS
const nodemailer = require('nodemailer')

//CONFIGURATION NODEMAILER
transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    service: process.env.MAILER_SERVICE,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS
    }
})

//DÉCLARATION DES VARIABLES QUI SERONT UTILISÉS 
let rand, mailOptions, host, link;

//POST CHANGEMENT DE MOT DE PASSE SUITE AU MOT DE PASSE OUBLIÉ
exports.editPasswordPost = async (req, res) => {

    await query(`UPDATE user SET password = 'modifpass' WHERE id = '${req.params.id}'`)
    res.json({
        success: await query(`SELECT * FROM user WHERE id = ${req.params.id}`)
    })


}

//GET PAGE AUTH COMPORTANT LES FORMULAIRES 
exports.get = (req, res) => {
    res.json('auth')
}

//REGISTER 
exports.register = async (req, res) => {




    //si la case cgu n'est pas cochée ou que les mots de passent de correspondent pas 

    console.log('pas checké ou password pas égal')
    //si tout est ok
    //génération de l'id aléatoire
    rand = Math.floor((Math.random() * 100) + 54)
    //host = lien de notre site
    host = req.get('host')
    //lien complet
    link = "http://" + req.get('host') + "/verify/" + rand
    //corps du mail qui seras envoyé
    mailOptions = {
        from: 'isec237@gmail.com',
        to: 'isec237@gmail.com',
        subject: "confirmez votre adresse mail",
        rand: rand,
        html: `<h2>Vérification de votre adresse mail</h2>
                   <h5>Cliquez sur le lien ci-dessous pour vérifier votre compte</h5><br>
                   <a href=" ` + link + `">Cliquez ici pour vérifier</a>`
    }

    //envoi du mail 
    transporter.sendMail(mailOptions, (err, res, next) => {
        if (err) {
            console.log(err)
            res.end("error")

        } else {
            console.log("message envoyé")
            next()
        }
    })
    //inscription dans la db du nouveau compte utilisateur
    let r = Math.floor(Math.random() * 1000)
    const sql = `INSERT INTO user (full_name, nickname, email, password)
                     VALUES ('register${r}','register${r}','register${r}','register${r}');`
    //envoi de la requete sql
    await query(sql)
    res.json({

        success: await query(`SELECT * FROM user`)
    })






}

//VERIF ACCOUNT GET PAGE BOUTON VERIF
exports.verifAccount = async (req, res) => {
    //mail = destinataire du mail
    res.json({
        message: 'bite a couille'
    })

}

//VERIF ACCOUNT POST
exports.verifAccountPost = async (req, res) => {

    await query(`UPDATE user SET is_verified = 1 WHERE id = ${req.params.id}`)

    res.json({
        message: await query(`SELECT is_verified FROM user WHERE id = ${req.params.id}`)
    })


}

//LOGIN 
exports.auth = (req, res) => {
    res.json({
        message: 'login successfull blabla'
    })


}

//LOGOUT
exports.logout = (req, res) => {
    //destruction du cookie de session de l'utilisateur
    req.session.destroy(() => {
        res.clearCookie('ptiBiscuit')
        //log de la session pour verifier
        console.log(req.session)
        res.json({
            message: 'logout successfull'
        })
    })
}