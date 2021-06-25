// CONTROLLEUR MON COMPTE
module.exports = {
    get: async(req, res) => {
        res.render('account', {
           userComments: await query(`SELECT * FROM comments WHERE author_id = 22`)
        })  
    },
    modifyComment: async(req, res) => {
        const sql = `UPDATE comments
                     SET
                        content = '${req.body.content}',
                        update_date = CURRENT_TIMESTAMP
                     WHERE id = ${req.params.id};`

              await query(sql)

              res.redirect('/account')
    },
    deleteCommentById : async (req, res) => {
        const sql = `DELETE FROM comments WHERE ID = ?`;
        let values = [req.params.id];

        await query(sql, [values])

        res.redirect('/account')

    }

}