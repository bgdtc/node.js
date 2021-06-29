module.exports = {
    get: async (req, res) => {
        console.log('dsqfsdsd: sgdg')
        if (req.session.user) {
            // const sql = `SELECT user.is_admin FROM user WHERE id = ${req.session.user.id}`
            const isAdmin = await query(`SELECT user.is_admin FROM user WHERE id = ${req.session.user.id}`)
            console.log('dfgdwsg: ', isAdmin)
            if (isAdmin[0].is_admin === 1) {
                res.render('admin', {
                    dbuser: await query(`SELECT * FROM user;`),
                    dbComments: await query(`SELECT * FROM comments;`),
                    dbArticles: await query(`SELECT * FROM articles;`)
                })
            } else {
                res.render('home', {
                    error: 'pas admin'
                })


            }
        } else {
            res.render('home', {
                error: 'pas admin'
            })
        }
    }




    // // CONTROLLEUR ADMIN PANEL
    // module.exports = {
    //         get: async (req, res) => {

    //                 if (!req.session.user) {
    //                     res.render('home', {
    //                         error: 'vous nêtes pas admin'
    //                     })
    //                 } else {
    //                     const sql = `SELECT user.is_admin FROM user WHERE id = ${req.session.user.id}`

    //                     await query(sql, (err, data) => {

    //                         if (err) throw err;

    //                         if (data[0].is_admin === 1) {
    //                             res.render('admin', {
    //                                 dbuser: query(`SELECT * FROM user;`),
    //                                 dbComments: query(`SELECT * FROM comments;`),
    //                                 dbArticles: query(`SELECT * FROM articles;`)
    //                             })


    //                         } else {
    //                             res.render('home', {
    //                                 error: 'pas admin'
    //                             })
    //                         }
    //                 }
    //             }
}