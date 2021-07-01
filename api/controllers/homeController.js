// CONTROLLEUR HOME 

// IMPORT DB SIMULÉE 
const simulate = require('../simulate.json')
const rSSimulate = simulate

// CONTROLLEUR HOME 
module.exports = {
    get: (req, res) => {

        res.render('home', {
            dbArticle: rSSimulate,
            home: 'home'
        })

    }
    
}