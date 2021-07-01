//CONTROLLEUR ADMIN GET PAGE ADMIN


module.exports = {
    //GET PAGE ADMIN
    get: async (req, res) => {
        //si l'utilisateur est connecté
        if (req.session.user) {
            const isAdmin = await query(`SELECT user.is_admin FROM user WHERE id = ${req.session.user.id}`)
            //si l'utilisateur connecté est administrateur
            if (isAdmin[0].is_admin === 1) {
                res.render('admin', {
                    dbuser: await query(`SELECT * FROM user;`),
                    dbComments: await query(`SELECT * FROM comments;`),
                    dbArticles: await query(`SELECT * FROM articles;`)
                })
            //si l'utilisateur connecté n'est pas administrateur
            } else {
                res.render('home', {
                    error: 'pas admin'
                })


            }
        //si l'utilisateur n'est pas connecté
        } else {
            res.render('home', {
                error: 'pas admin'
            })
        }
    }
}