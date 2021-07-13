// CONTROLLEUR FEED RSS
module.exports = {
    get: async (req, res) => {
        if (!req.session.user) {
            res.render('home', {
                error: 'pas connecté'
            })
        } else {
            res.json({
                message: await query(`SELECT * FROM articles`)
            })
        }

    }
}