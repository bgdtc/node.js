module.exports = {
    get: async(req, res) => {
        res.render('feed', {layout: false})
    }
}

