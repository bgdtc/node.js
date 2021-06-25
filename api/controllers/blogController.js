// CONTROLLEUR BLOG ---------------------------------------------------

// IMPORT DB SIMULÉE ET REVERSE ---------------------------------------
const simulater = require('../simulate.json')
const rSimulate = simulater.reverse()


//AFFICHAGE DE LA PAGE BLOG EN FONCTION DU STATUT ---------------------
exports.get =  (req, res) => {

  
    const sql = `SELECT user.is_verified FROM user WHERE id = 22;`;
    
     query(sql, (error, data) => {
        if (error) throw error;
      if (data[0].is_verified === 0) {

        res.render('blog', {
            
        })

      }  else {
          res.render('blog', {
            dbArticle: rSimulate  
          })
      }
    })
}

//AFFICHAGE DE LA PAGE ID SELON LE STATUT -----------------------------
exports.getID = async (req, res) => {
  const sql = `SELECT user.is_verified FROM user WHERE id = 22;`;

  db.query(sql, (error, data) => {
    if (error) throw error;
  if (data[0].is_verified === 0) {

    res.render('auth', {
        error: 'pour lire les articles connecté être tu doit'
    })

  }  else {
      res.render('pageID', {
         artID
      })
  }
})

    // Je definit un objet vide qui va stocker ma data
    let artID = {}
    // Je creer une boucle pour extraire l'ojet ayant l'id passer en parametre de l'url
    await simulater.forEach(art => { if ( art.id === req.params.id ) artID = art })


}