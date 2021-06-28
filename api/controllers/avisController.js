// CONTROLLEUR AVIS
module.exports = {
    get: async (req, res) => {
        res.render('avis', {
            dbAvis: await query(`SELECT * FROM comments WHERE is_avis = 1`)
        })
    },
    postAvis: async (req, res) => {
        const sql = `INSERT INTO comments
                     (author_id,content,is_avis)
                     VALUES ('33', '${req.body.content}','1')`

            await query(sql)
            res.redirect('/avis')
    }
}
