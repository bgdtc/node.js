module.exports = {
    get: (req, res) => {
        res.render('404', {
            cook: (req.cookies.Cookie) ? true : false
        })
    }
}