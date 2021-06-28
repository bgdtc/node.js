// CONTROLLEUR D'IDENTIFICATION ---------------------

//IMPORT BCRYPT -------------------------------------
const bcrypt = require('bcrypt')

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

//LOST PASSWORD -------------------------------------
exports.lostPassword = (req, res) => {
    console.log('AUTH controller lost_password ', req.body)

    let sqlUser = ` SELECT user.password, user.email, user.nickname
                    FROM user
                    WHERE email = "${ req.body.email }"`

    db.query(sqlUser, async (err, data) => {
        if (err) console.log(err)

        console.log('data1: ', data)

        const passwordMatch = await bcrypt.compare('de', data[0].password);

        console.log(passwordMatch)

        if (!passwordMatch) console.log('pas match')
        else if (passwordMatch) {
            res.render('auth', {
                success: 'Welcome ' + data[0].nickname
            })
        } else console.log('erreur')

        console.log('data2: ', data)
    })

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

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('ptiBiscuit')
        console.log(req.session)
        res.redirect('/')
    })
}