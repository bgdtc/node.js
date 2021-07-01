// CONTROLLEUR D'IDENTIFICATION ---------------------
//IMPORT BCRYPT -------------------------------------
const bcrypt = require('bcrypt');
require('dotenv').config()
const nodemailer = require('nodemailer')

transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    service: process.env.MAILER_SERVICE,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS
    }
})
let rand, mailOptions, host, link;
//IMPORT NODEMAILER ---------------------------------

exports.editPasswordPost = async (req, res) => {
    console.log(req.body)
    const user = await query(`SELECT * FROM user WHERE email = '${req.body.email}'`)
    if (!user) {
        console.log('utilisateur inexistant')
        res.redirect('/')
    } else {
        console.log('working')
        console.log(req.body.email)

        await query(`UPDATE user SET password = '${await bcrypt.hash(req.body.password, 16)}' WHERE email = '${req.body.email}'`)
        res.render('auth', {
            success: 'mot de passe modifié avec succès'
        })
    }

}

//GET ----------------------------------------------
exports.get = (req, res) => {
    res.render('auth');
}

//REGISTER ------------------------------------------
exports.register = async (req, res) => {
    console.log('AUTH controller register ', req.body)


    if (req.body.checked !== 'on' || req.body.password !== req.body.passwordConfirm) {
        console.log('pas checké ou password pas égal')
    } else {

        rand = Math.floor((Math.random() * 100) + 54)

        host = req.get('host')

        link = "http://" + req.get('host') + "/verify/" + rand

        mailOptions = {
            from: 'isec237@gmail.com',
            to: req.body.email,
            subject: "confirmez votre adresse mail",
            rand: rand,
            html: `<h2>Vérification de votre adresse mail</h2>
                   <h5>Cliquez sur le lien ci-dessous pour vérifier votre compte</h5><br>
                   <a href=" ` + link + `">Cliquez ici pour vérifier</a>`
        }
        console.log(mailOptions)

        transporter.sendMail(mailOptions, (err, res, next) => {
            if (err) {
                console.log(err)
                res.end("error")

            } else {
                console.log("message envoyé")
                next()
            }
        })
        const sql = `INSERT INTO user (full_name, nickname, email, password)
                     VALUES ('${req.body.full_name}','${req.body.nickname}','${req.body.email}','${ await bcrypt.hash(req.body.password, 16) }');`

        db.query(sql, (err, data) => {
            if (err) console.log(err)
            if (err) res.render('auth', {
                error: 'shit happened !'
            })

            console.log(data)
            res.render('auth', {

                success: 'bien joué tu est inscrit maintenant vérifie tes mails'
            })
        })



    }


}
//VERIF ACCOUNT -------------------------------------

exports.verifAccount = async (req, res) => {
    console.log('test: ', mailOptions.to)
    let mail = mailOptions.to
    const user = await query(`SELECT * FROM user WHERE email = '${mail}'`)
    console.log(req.protocol + "://" + req.get('host'))
    console.log('Page verify: ')
    console.log(user)
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email")

        // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
        if (req.params.id == mailOptions.rand) {
            console.log("email is verified")
            console.log(user)
            res.render('verifId', {
                user: user[0],
                email: mailOptions.to

            })

        } else {
            console.log("email is not verified")
            res.render('verifId', {
                message: "Bad Request !"
            })

        }
    } else {
        res.render('verifId', {
            message: "Request is from unknown source !"
        })

    }

}
//VERIF ACCOUNT POST --------------------------------
exports.verifAccountPost = async (req, res) => {
    const user = await query(`SELECT * FROM user WHERE id = ${req.params.id}`)
    console.log('Verified post controller')

    if (user) {
        await query(`UPDATE user SET is_verified = 1 WHERE id = ${req.params.id}`)
        req.session.is_verified = true
        res.redirect('/')

    } else res.redirect('/')
}

//LOGIN ---------------------------------------------
exports.auth = (req, res) => {
    console.log('AUTH controller auth', req.body)

    // 123456
    if (req.body.checked !== 'on') {
        console.log('Not Checked form !')
        res.render('auth', {
            error: 'Pas de bd !'
        })
    } else {
        const sql = `SELECT * FROM user WHERE email = '${req.body.email}';`
        db.query(sql, (err, data) => {
            if (err) console.log(err)
            if (!data[0]) res.render('auth', {
                error: 'shit happened !'
            })
            else {
                let dat = data[0].email
                if (dat === req.body.email) {
                    // Génère le hash du mot de passe reçu dans la requete
                    // bcrypt.hash(req.body.password, 10, (hash) => {
                    // console.log('Pass hash: ', req.body.password, hash)

                    // Compare le hash de la base de donné (mdp simulé) avec le hash creer avec le password de la requete
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
                }

            }

        })
    }


}
//LOGOUT
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('ptiBiscuit')
        console.log(req.session)
        res.redirect('/')
    })
}