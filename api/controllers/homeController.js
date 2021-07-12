// CONTROLLEUR HOME 

// IMPORT DB SIMULÉE 


// CONTROLLEUR HOME 
module.exports = {
    get: async (req, res) => {
        const dbArticle =  await query(`SELECT * FROM articles`)
        const reverse = dbArticle.reverse()
        res.render('home', {
            dbArticle: reverse,
            home: 'home'
        })

    }

}