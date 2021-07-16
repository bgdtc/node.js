// CONTROLLEUR MENTIONS LÉGALES
module.exports = {
    get: (req, res) => {
        res.render('mentions_legales',{
            cook: (req.cookies.Cookie) ? true : false
        })
    }
}