/*
 * Module
 * ****** */
const simulate = require('../simulate.json')
const rSimulate = simulate.reverse()

/*
 * Controller
 *************/
exports.get = (req, res) => {
    res.render('blog', {
        dbArticle: rSimulate

    })
}

exports.getID = async (req, res) => {

    // Je definit un objet vide qui va stocker ma data
    let artID = {}
    // Je creer une boucle pour extraire l'ojet ayant l'id passer en parametre de l'url
    await simulate.forEach(art => { if ( art.id === req.params.id ) artID = art })

    res.render('pageID', {
        artID
    })

}