// CONTROLLEUR ?? ID ???
module.exports = {
    get: (req, res) => {
        res.render('id',{
            cook: (req.cookies.Cookie) ? true : false
        })
    }
}