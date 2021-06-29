const bcrypt = require('bcrypt')
// CONTROLLEUR MON COMPTE
module.exports = {
    get: async(req, res) => {
        if (req.session.user) {
            res.render('account', {
                userComments: await query(`SELECT * FROM comments WHERE author_id = ${req.session.user.id}`),
                userID: await query(`SELECT * FROM user WHERE email = '${req.session.user.email}'`)
             })  
        } else {
            res.render('home', {
                error: 'non connecté'
            })
        }
       
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

    },
    modifyAccount: async(req, res) => {
        console.log(req.body);
        if (req.body.password !== '') {
            const sql = `UPDATE user
            SET 
               full_name = '${req.body.full_name}',
               nickname = '${req.body.nickname}',
               email = '${req.body.email}',
               password = '${ await bcrypt.hash(req.body.password, 16) }',
               image = '${req.body.image}'
           WHERE id = ${req.params.id}`

       await query(sql)

       res.redirect('/account')
        } else {

            const sql = `UPDATE user
            SET 
               full_name = '${req.body.full_name}',
               nickname = '${req.body.nickname}',
               email = '${req.body.email}',
               image = '${req.body.image}'
           WHERE id = ${req.params.id}`

       await query(sql)

       res.redirect('/account')

        }
       
    }

}