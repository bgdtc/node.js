const bcrypt = require('bcrypt')

exports.get = (req, res) => {
    res.render('auth');
}

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
            if (data[0].email === req.body.email) {
                // Génère le hash du mot de passe reçu dans la requete
                // bcrypt.hash(req.body.password, 10, (hash) => {
                    // console.log('Pass hash: ', req.body.password, hash)

                    // Compare le hash de la base de donné (mdp simulé) avec le hash creer avec le password de la requete
                    bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                        if (err) console.log(err)

                        console.log('RESULT: ', result)

                        if (!result) console.log('les mot de passe ne correspondent pas')

                        else console.log('Mot de passe OK !')
                    })
                // })
            }

        })
    }


}