// CONTROLLEUR BLOG 

//AFFICHAGE DE LA PAGE BLOG EN FONCTION DU STATUT 
exports.getBlog = async (req, res) => {
  //si utilisateur pas connecté
  if (!req.session.user) {
    res.render('blog', {
      error: 'Vous devez être connecté pour voir les articles'
    })
    //si utilisateur connecté
  } else {
    const dbArticle =  await query(`SELECT * FROM articles`)
    const reverse = dbArticle.reverse()
    const sql = `SELECT user.is_verified FROM user WHERE id = ${req.session.user.id};`;
    await query(sql, (error, data) => {
      if (error) throw error
      res.render('blog', {
        dbArticle: reverse
      })
    })

  }

}

//AFFICHAGE DE LA PAGE ID SELON LE STATUT 
exports.getID = async (req, res) => {
  let artIDd =  await query(`SELECT * FROM articles WHERE id = ${req.params.id}`)
  let comsIDd = await query(`SELECT * FROM comments WHERE article_id = ${req.params.id}`)
  const sql = `SELECT user.is_verified FROM user WHERE id = '${req.session.user.id}';`;
 await query(sql, (error, data) => {
    if (error) throw error;
    if (data[0].is_verified === 0) {

      res.render('auth', {
        error: 'pour lire les articles connecté être tu doit'
      })

    } else {
     console.log(comsIDd)
      let artID = artIDd[0]
      // let comsID = comsIDd[0]
      res.render('pageID', {
        artID,
        comsIDd
      })
    }
  })
  

  // await artID.forEach(art => {
  //   if (art.id === req.params.id) artID = art
  // })


  // Je definit un objet vide qui va stocker ma data
  // let artID = {}

  console.log('ràepfjzeofijzeofizjfeoiz', req.params.id)
  // Je creer une boucle pour extraire l'ojet ayant l'id passer en parametre de l'url


}