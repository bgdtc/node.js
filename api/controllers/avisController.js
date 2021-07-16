// CONTROLLEUR AVIS

module.exports = {
    //GET DE LA PAGE AVIS
    get: async (req, res) => {
        res.render('avis', {
            dbAvis: await query(`SELECT * FROM comments WHERE is_avis = 1`),
            cook: (req.cookies.Cookie) ? true : false
        })
    },
    //POST UN AVIS 
    postAvis: async (req, res) => {
        if (req.session.user) {
            const sql = `INSERT INTO comments
            (author_id, author_name, content,is_avis,title)
            VALUES ('${req.session.user.id}','${req.session.user.full_name}', '${req.body.content}','1', '${req.body.title}')`

            await query(sql)
            res.redirect('/avis')
        } else {
            res.json({
                error: 'non'
            })
        }

    }
}