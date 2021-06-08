/*
 * Module
 * ****** */ 
const simulate = require('../simulate.json')
const rSSimulate = simulate.slice(simulate.length - 3, simulate.length).reverse()

/*
 * Controller
 *************/ 
module.exports = {
    get: (req, res) => {

        res.render('home', {
            dbArticle: rSSimulate
        })

    }
    
}