// CONTROLLEUR AVIS

module.exports = {
    //GET DE LA PAGE AVIS
    get: async (req, res) => {
        res.render('avis', {
            dbAvis: await query(`SELECT * FROM comments WHERE is_avis = 1`),
        })
    },
    //POST UN AVIS 
    postAvis: async (req, res) => {
        const sql = `INSERT INTO comments
                     (author_id,content,is_avis)
                     VALUES ('${req.session.user.id}', '${req.body.content}','1')`

            await query(sql)
            res.redirect('/avis')
    }
}
