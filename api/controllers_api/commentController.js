// // CONTROLLEUR COMMENTS ADMIN 


module.exports = {

    // DELETE COMMENT BY ID ADMIN
    deleteCommentById: async (req, res) => {

        let sql = `DELETE FROM comments  WHERE id = ?`;
        let values = [req.params.id];

        

        res.json({
            message: await query(sql, [values]) 
        })
    },
    //MODIFY COMMENT BY ID ADMIN 
    modifyComment: async (req, res) => {

        const sql = `UPDATE comments 
                      SET
                         content  = 'update test comment',
                         is_avis  = '1',
                         is_banned     = '0',
                         update_date = CURRENT_TIMESTAMP
                      WHERE id = ${req.params.id};`
       

        res.json({
            message: await query(sql) 
        })
    },
    getComment: async (req, res) => {
        const sql = `SELECT * FROM comments`
        await query(sql)
    }
}