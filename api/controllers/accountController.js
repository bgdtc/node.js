//CONTROLLEUR GESTION DU COMPTE


//IMPORT BCRYPT POUR HASHER LE NOUVEAU MDP
const bcrypt = require('bcrypt')
// CONTROLLEUR MON COMPTE
module.exports = {
    //GET RES RENDER LA PAGE
    get: async (req, res) => {
        //si un utilisateur est connécté
        if (req.session.user) {
            res.render('account', {
                userComments: await query(`SELECT * FROM comments WHERE author_id = ${req.session.user.id}`),
                userID: await query(`SELECT * FROM user WHERE email = '${req.session.user.email}'`)
            })
            //si un utilisateur n'est pas connecté
        } else {
            res.render('home', {
                error: 'non connecté'
            })
        }

    },
    //MODIFY COMMENTS POSTÉS PAR L'USER
    modifyComment: async (req, res) => {
        const sql = `UPDATE comments
                     SET
                        content = '${req.body.content}',
                        update_date = CURRENT_TIMESTAMP
                     WHERE id = ${req.params.id};`

        await query(sql)

        res.redirect('/account')
    },
    //DELETE COMMENTS POSTÉS PAR L'USER
    deleteCommentById: async (req, res) => {
        const sql = `DELETE FROM comments WHERE ID = ?`;
        let values = [req.params.id];

        await query(sql, [values])

        res.redirect('/account')

    },
    //MODIFY INFORMATIONS DU COMPTE
    modifyAccount: async (req, res) => {
        //si le champ nouveau mot de passe n'est pas vide
        if (req.body.NewPassword !== '') {
            const sql = `UPDATE user
            SET 
               full_name = '${req.body.full_name}',
               email = '${req.body.email}',
               password = '${ await bcrypt.hash(req.body.NewPassword, 16) }',
               image = '${req.body.image}'
           WHERE id = '${req.params.id}'`

            await query(sql)

            res.redirect('/account')
            res.end()
            //si le champ nouveau mot de passe est vide 
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