// // CONTROLLEUR COMMENTS ADMIN 


module.exports = {

    // DELETE COMMENT BY ID ADMIN

    deleteCommentById: async (req, res) => {
        if (req.session.user) {
            const isAdmin = await query(`SELECT user.is_admin FROM user WHERE id = ${req.session.user.id}`)
            if (isAdmin[0].is_admin === 1) {

                let sql = `DELETE FROM comments  WHERE id = ?`;
                let values = [req.params.id];

                await query(sql, [values])

                res.redirect('/admin')

            } else {
                res.json({
                    error: 'non'
                })
            }
        } else {
            res.json({
                error: 'non'
            })
        }

    },
    //MODIFY COMMENT BY ID ADMIN 
    modifyComment: async (req, res) => {
        if (req.session.user) {
            const isAdmin = await query(`SELECT user.is_admin FROM user WHERE id = ${req.session.user.id}`)
            if (isAdmin[0].is_admin === 1) {

                const sql = `UPDATE comments 
                SET
                   content  = '${req.body.content}',
                   is_avis  = '${req.body.is_avis}',
                   is_banned     = '${req.body.is_banned}',
                   update_date = CURRENT_TIMESTAMP
                WHERE id = ${req.params.id};`
                await query(sql)

                res.redirect('/admin#comments')

            } else {
                res.json({
                    error: 'non'
                })
            }
        } else {
            res.json({
                error: 'non'
            })
        }


    },
    getComment: async (req, res) => {
        const sql = `SELECT * FROM comments`
        await query(sql)
    }
}