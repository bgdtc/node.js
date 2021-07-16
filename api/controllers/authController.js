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
    const user = await query(`SELECT * FROM user WHERE email = '${req.body.email}'`)
    //si l'adresse mail n'existe pas dans la db
    if (!user) {
        console.log('utilisateur inexistant')
        res.redirect('/')
        //si l'adresse mail existe dans la db
    } else {
        console.log('working')
        console.log(req.body.email)

        await query(`UPDATE user SET password = '${await bcrypt.hash(req.body.password, 16)}' WHERE email = '${req.body.email}'`)
        res.render('auth', {
            success: 'mot de passe modifié avec succès',
            cook: (req.cookies.Cookie) ? true : false
        })
    }

}

//GET PAGE AUTH COMPORTANT LES FORMULAIRES 
exports.get = (req, res) => {
    res.render('auth',{
        cook: (req.cookies.Cookie) ? true : false
    });
}

//REGISTER 
exports.register = async (req, res) => {


    console.log('AUTH controller register ', req.body)

    //si la case cgu n'est pas cochée ou que les mots de passent de correspondent pas 
    if (req.body.checked !== 'on' || req.body.password !== req.body.passwordConfirm) {
        console.log('pas checké ou password pas égal')
        //si tout est ok
    } else {
        //génération de l'id aléatoire
        rand = Math.floor((Math.random() * 100) + 54)
        //host = lien de notre site
        host = req.get('host')
        //lien complet
        link = "http://" + req.get('host') + "/verify/" + rand
        //corps du mail qui seras envoyé
        mailOptions = {
            from: 'isec237@gmail.com',
            to: req.body.email,
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
        const sql = `INSERT INTO user (full_name, nickname, email, password)
                     VALUES ('${req.body.full_name}','${req.body.nickname}','${req.body.email}','${ await bcrypt.hash(req.body.password, 16) }');`
        //envoi de la requete sql
        query(sql, (err, data) => {
            if (err) console.log(err)
            //si y'a une erreur , shit happened
            if (err) res.render('auth', {
                error: 'shit happened !',
                cook: (req.cookies.Cookie) ? true : false
            })
            //si y'a pas d'erreur
            console.log(data)
            res.render('auth', {

                success: 'bien joué tu est inscrit maintenant vérifie tes mails',
                cook: (req.cookies.Cookie) ? true : false
            })
        })



    }


}

//VERIF ACCOUNT GET PAGE BOUTON VERIF
exports.verifAccount = async (req, res) => {
    //mail = destinataire du mail
    let mail = mailOptions.to
    const user = await query(`SELECT * FROM user WHERE email = '${mail}'`)
    console.log('page verify')
    //si l'utilisateur viens bien de cliquer sur le lien envoyé dans sa boite mail
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email")

        // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
        if (req.params.id == mailOptions.rand) {
            console.log("email is verified")
            consol('verifId', {
                user: user[0],
                email: mailOptions.to,
                cook: (req.cookies.Cookie) ? true : false

            })
            //si l'id correspond pas 
        } else {
            console.log("email is not verified")
            res.render('verifId', {
                message: "Bad Request !",
                cook: (req.cookies.Cookie) ? true : false
            })

        }
        //si l'utilisateur est un petit malin 
    } else {
        res.render('verifId', {
            message: "Request is from unknown source !",
            cook: (req.cookies.Cookie) ? true : false
        })

    }

}

//VERIF ACCOUNT POST
exports.verifAccountPost = async (req, res) => {
    const user = await query(`SELECT * FROM user WHERE id = ${req.params.id}`)
    console.log('Verified post controller')
    //si c'est bon ça balance le changement de statut
    if (user) {
        await query(`UPDATE user SET is_verified = 1 WHERE id = ${req.params.id}`)
        req.session.is_verified = true
        res.redirect('/')
        //sinon ça renvoie sur home
    } else res.redirect('/')
}

//LOGIN 
exports.auth = (req, res) => {
    console.log('AUTH controller auth', req.body)

    // si les cgu sont pas cochées
    if (req.body.checked !== 'on') {
        console.log('Not Checked form !')
        res.render('auth', {
            error: 'Pas de bd !',
            cook: (req.cookies.Cookie) ? true : false
        })
        //si elles sont cochées
    } else {
        const sql = `SELECT * FROM user WHERE email = '${req.body.email}';`
        query(sql, (err, data) => {
            if (err) console.log(err)
            //si l'email existe pas dans la db
            if (!data[0]) res.render('auth', {
                error: 'shit happened !'
            })
            //si l'email existe dans la db
            else {
                let dat = data[0].email
                let uat = data[0].is_verified
                //si l'email correspond a l'email de la db et que l'user est vérifié 
                if (dat === req.body.email && uat === 1) {

                    bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                        if (err) console.log(err)

                        console.log('RESULT: ', result)

                        if (!result) console.log('les mot de passe ne correspondent pas'), res.render('auth', {
                            error: 'shit happened !'
                        })

                        else console.log('Mot de passe OK !'),
                            req.session.user = {
                                full_name: data[0].full_name,
                                email: data[0].email,
                                is_admin: data[0].is_admin,
                                is_verified: data[0].is_verified,
                                is_banned: data[0].is_banned,
                                id: data[0].id
                            }
                        console.log('connexion', req.session)
                        res.locals.user = req.session.user
                        if (data[0].is_admin === 1) {
                            req.session.is_admin = true
                            res.locals.admin = true
                            return res.redirect('/admin')
                        } else {
                            res.redirect('/')
                        }


                    })
                    // })
                } else {
                    res.render('home', {
                        error: 'Veuillez consulter vos mails vous n\'êtes pas vérifiés',
                        cook: (req.cookies.Cookie) ? true : false
                    })
                }

            }

        })
    }


}

//LOGOUT
exports.logout = (req, res) => {
    //destruction du cookie de session de l'utilisateur
    req.session.destroy(() => {
        res.clearCookie('ptiBiscuit')
        //log de la session pour verifier
        console.log(req.session)
        res.redirect('/')
    })
}