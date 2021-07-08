// CONTROLLEUR BLOG 

//AFFICHAGE DE LA PAGE BLOG EN FONCTION DU STATUT 
exports.getBlog = async (req, res) => {
  //si utilisateur pas connecté
    //si utilisateur connecté
    const dbArticle =  await query(`SELECT * FROM articles`)
    const reverse = dbArticle.reverse()
    await query(`SELECT * FROM articles`, (error, data) => {
      if (error) throw error
      res.json(dbArticle)
    })

}

//AFFICHAGE DE LA PAGE ID SELON LE STATUT 
exports.getID = async (req, res) => {
  let artIDd =  await query(`SELECT * FROM articles WHERE id = ${req.params.id}`)
 await query(`SELECT * FROM articles WHERE id = ${req.params.id}`, (error, data) => {
    if (error) throw error;
      let artID = artIDd[0]
      res.json({
        artID
      })
  })
  

  // await artID.forEach(art => {
  //   if (art.id === req.params.id) artID = art
  // })


  // Je definit un objet vide qui va stocker ma data
  // let artID = {}

  console.log('ràepfjzeofijzeofizjfeoiz', req.params.id)
  // Je creer une boucle pour extraire l'ojet ayant l'id passer en parametre de l'url


}