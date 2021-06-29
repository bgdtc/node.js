// // CONTROLLEUR COMMENTS ADMIN 
module.exports = {
    // DELETE COMMENT BY ID ADMIN
    deleteArticleById: async (req, res) => {
      
        let sql = `DELETE FROM articles  WHERE id = ?`;
        let values = [req.params.id];
      
        await query(sql, [values])

        res.redirect('/admin')
    },
    modifyArticle: async (req, res) => {
        let sql = `UPDATE articles 
                      SET
                         author_id = '22',
                         image  = '${req.body.image}',
                         title  = '${req.body.title}',
                         description     = '${req.body.description}',
                         content = '${req.body.content}'
                      WHERE id = ${req.params.id}`;


        await query(sql)

        res.redirect('/admin')     
    },
    addArticle: async (req, res) => {
        console.log('ARTICLES controller add article: ', req.body)

        if (req.body.checked === 'on') {
            const sql = `INSERT INTO articles (author_id, image, title, description, content)
            VALUES ('22',
             '${req.body.image}',
              '${req.body.title}',
               '${req.body.description}',
                '${req.body.content}');
           `

           await query(sql)

           res.redirect('/admin')
        } else {
            res.render('admin', {
                error: 'pas coché'
            })
        }
        
    },
    addComment: async (req, res) => {
        console.log('ARTICLE controller add comment', req.body)

        if (req.body.checked === 'on') {
            const sql = `INSERT INTO comments`
        }
    }   

}