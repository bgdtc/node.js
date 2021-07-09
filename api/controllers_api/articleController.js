// // CONTROLLEUR COMMENTS ADMIN 

//PATH ET FS POUR SUPPRESSION D'IMAGE
const path = require('path'),
    fs = require('fs')


module.exports = {
    // DELETE ARTICLE BY ID ADMIN
    deleteArticleById: async (req, res) => {
        const dbArticle = await query(`SELECT * FROM articles where id = ${req.params.id}`)

        console.log('ARTICLE controller delete article:', req.body)
        let sql = `DELETE FROM articles  WHERE id = ?`;
        let values = [req.params.id];
        await query(sql, [values])
        // console.log('EORGIHEORGIHEROGIH', dbArticle[0].name)
        // pathImg = path.resolve("public/images/" + dbArticle[0].name)
        // fs.unlink(pathImg, (err) => {
        //     if (err) console.log(err)
        // })
        res.status(200).json({
            message: "article supprimé avec succès status: 200"
        })
    },
    //MODIFY ARTICLE BY ID ADMIN
    modifyArticle: async (req, res) => {
            let rand = Math.floor(Math.random() * 100 )
            console.log('ARTICLE controller modify article:', req.body)
            const sql = `UPDATE articles 
                          SET
                             title  = "titre${rand}",
                             description     = "description${rand}",
                             content = "contenu${rand}"
                          WHERE id = '${req.body.id}';`

           
            res.status(200).json({
                message:  await query(sql)
            })


    },
    //ADD ARTICLE ADMIN
    addArticle: async (req, res) => {
        res.json({
            message: await query(`INSERT INTO articles (author_id, title, description, content)
                    VALUES ("1",
                      "titre",
                       "description",
                        "content");
                   `)
        })

    },
    //ADD COMMENT ARTICLE
    addComment: async (req, res) => {
        console.log('ARTICLE controller add comment', req.body)
            const sql = `INSERT INTO comments (author_id, content, title) VALUES ('26','contenutest','titretest')`
            await query(sql)
            res.json({
                message: await query(`SELECT * FROM comments`)
               
            })
    }

}