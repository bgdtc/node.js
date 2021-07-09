//CONTROLLEUR GESTION DU COMPTE


// IMPORT PATH ET FS POUR CHEMIN D'IMAGE SUPPRESSION
const path = require('path'),
    fs = require('fs')

//IMPORT BCRYPT POUR HASHER LE NOUVEAU MDP
const bcrypt = require('bcrypt')
// CONTROLLEUR MON COMPTE
module.exports = {
    //GET RES RENDER LA PAGE
    get: async (req, res) => {
        //si un utilisateur est connécté
        if (req.session.user) {
            res.json( {
                userComments: await query(`SELECT * FROM comments WHERE author_id = ${req.session.user.id}`),
                userID: await query(`SELECT * FROM user WHERE email = '${req.session.user.email}'`)
            })
            //si un utilisateur n'est pas connecté
        } else {
            res.json({
                error: 'non connecté'
            })
        }

    },
    //MODIFY COMMENTS POSTÉS PAR L'USER
    modifyComment: async (req, res) => {
        const sql = `UPDATE comments
                     SET
                        content = 'modifCOmmentuser',
                        update_date = CURRENT_TIMESTAMP
                     WHERE author_id = ${req.params.id};`

        await query(sql)

        res.json({
            message: await query(`SELECT * FROM comments WHERE author_id = ${req.params.id}`)
        })
    },
    //DELETE COMMENTS POSTÉS PAR L'USER
    deleteCommentById: async (req, res) => {
        const sql = `DELETE FROM comments WHERE ID = ?`;
        let values = [req.params.id];

        await query(sql, [values])

        res.json(sql)

    },
    //MODIFY INFORMATIONS DU COMPTE
    modifyAccount: async (req, res) => {
      let r = Math.floor(Math.random() * 1000)
        await query(`UPDATE user
                     SET full_name = 'modifFN_${r}',
                         nickname = 'modifNN_${r}',
                         email = 'modifEM_${r}',
                         password = 'modifPS_${r}'
                     WHERE id = ${req.params.id}`)

        res.json({
            message: await query(`SELECT * FROM user WHERE id = ${req.params.id}`)
        })             
    }

}