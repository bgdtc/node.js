// // CONTROLLEUR COMMENTS ADMIN 


module.exports = {

    // DELETE COMMENT BY ID ADMIN
    deleteCommentById: async (req, res) => {
      
        let sql = `DELETE FROM comments  WHERE id = ?`;
        let values = [req.params.id];
      
        await query(sql, [values])

        res.redirect('/admin')
    },
    //MODIFY COMMENT BY ID ADMIN 
    modifyComment: async (req, res) => {

        const sql = `UPDATE comments 
                      SET
                         content  = '${req.body.content}',
                         is_avis  = '${req.body.is_avis}',
                         is_banned     = '${req.body.is_banned}',
                         update_date = CURRENT_TIMESTAMP
                      WHERE id = ${req.params.id};`
              await query(sql)

              res.redirect('/admin#comments')     
    },
    getComment: async (req, res) => {
        const sql = `SELECT * FROM comments`
        await query(sql)
    }     
}