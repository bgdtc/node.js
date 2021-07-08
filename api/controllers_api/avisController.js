// CONTROLLEUR AVIS


module.exports = {
    //GET DE LA PAGE AVIS
    get: async (req, res) => {
        res.json({
            dbAvis: await query(`SELECT * FROM comments WHERE is_avis = 1`),
        })
    },
    //POST UN AVIS 
    postAvis: async (req, res) => {
   
        res.json({
            message: await query(`INSERT INTO comments
            (author_id,content,is_avis,title)
            VALUES ('26', 'test','1', 'test')`)
        })
    }
}