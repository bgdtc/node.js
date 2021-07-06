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
        console.log('EORGIHEORGIHEROGIH', dbArticle[0].name)
        pathImg = path.resolve("public/images/" + dbArticle[0].name)
        fs.unlink(pathImg, (err) => {
            if (err) console.log(err)
        })
        res.redirect('/admin')
    },
    //MODIFY ARTICLE BY ID ADMIN
    modifyArticle: async (req, res) => {

        if (!req.file) {

            console.log('ARTICLE controller modify article:', req.body)
            const sql = `UPDATE articles 
                          SET
                             author_id = "22",
                             title  = "${req.body.title}",
                             description     = "${req.body.description}",
                             content = "${req.body.content}"
                          WHERE id = "${req.params.id}";`

            await query(sql)
            res.redirect('/admin')

        } else {
            console.log('sofizefihjz: ', req.file)
            console.log('ARTICLE controller modify article:', req.body)
            const dbArticle = await query(`SELECT * FROM articles where id = '${req.params.id}'`)
            const sql = `UPDATE articles 
                          SET
                             author_id = "${req.session.id}",
                             name = "${req.file.completed}",
                             image  = "/assets/images/${req.file.completed}",
                             title  = "${req.body.title}",
                             description  = "${req.body.description}",
                             content = "${req.body.content}"
                          WHERE id = "${req.params.id}";
                        `

            console.log('GRGERGERG:', dbArticle[0].name)
            await query(sql)
            //CHEMIN VERS L'IMAGE QUI SERAS SUPPRIMÉE
            pathImg = path.resolve("public/images/" + dbArticle[0].name)
            //COMMANDE DE SUPPRESSION DE L'IMAGE
            fs.unlink(pathImg, (err) => {
                if (err) console.log(err)
            })

            res.redirect('/admin')

        }

    },
    //ADD ARTICLE ADMIN
    addArticle: async (req, res) => {
        console.log('ARTICLES controller add article: ', req.body)

        if (req.body.checked === 'on') {
            if (req.file) {

                const sql = `INSERT INTO articles (author_id, image,name, title, description, content)
                VALUES ("22",
                 "/assets/images/${req.file.completed}",
                 "${req.file.completed}", 
                  "${req.body.title}",
                   "${req.body.description}",
                    "${req.body.content}");
               `
                await query(sql)

                res.redirect('/admin')



            } else {
                const sql = `INSERT INTO articles (author_id, title, description, content)
            VALUES ("22",
              "${req.body.title}",
               "${req.body.description}",
                "${req.body.content}");
           `
                await query(sql)

                res.redirect('/admin')
            }


        } else {
            res.redirect('/admin')
        }

    },
    //ADD COMMENT ARTICLE
    addComment: async (req, res) => {
        console.log('ARTICLE controller add comment', req.body)

        if (req.body.checked === 'on') {
            const sql = `INSERT INTO comments ${req.body.content}`
        }
    }

}