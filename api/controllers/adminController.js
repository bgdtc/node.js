module.exports = {
    get: (req, res) => {
        res.render('admin',{layout: 'secondary.hbs'});
    }
}
