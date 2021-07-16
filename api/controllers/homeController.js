// CONTROLLEUR HOME 

// IMPORT DB SIMULÉE 


// CONTROLLEUR HOME 
module.exports = {
    get: async (req, res) => {

         console.log(req.cookies);
        const dbArticle = await query(`SELECT * FROM articles`)
        const reverse = dbArticle.reverse()

        console.log('Cookie: ', req.cookies.Cookie)

        res.render('home', {
            dbArticle: reverse,
            home: 'home',
            cook: (req.cookies.Cookie) ? true : false
        })
    }

}

