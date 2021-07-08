// CONTROLLEUR HOME 

// IMPORT DB SIMULÉE 
const simulate = require('../simulate.json')
const rSSimulate = simulate

// CONTROLLEUR HOME 
module.exports = {
    get: async (req, res) => {
        const dbArticle =  await query(`SELECT * FROM articles`)
        const reverse = dbArticle.reverse()
        res.json( {
            dbArticle: reverse,
            home: 'home'
        })

    }

}