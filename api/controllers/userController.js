//CONTROLLEUR USER

//IMPORT DE BCRYPT POUR LES PASSWORD HASH
const bcrypt = require('bcrypt');


module.exports = {
    // DELETE USER BY ID ADMIN
    deleteUserById: async (req, res) => {

        let sql = `DELETE FROM user  WHERE id = ?`;
        let values = [req.params.id];

        await query(sql, [values])

        res.redirect('/admin')
    },
    // ADD USER ADMIN
    addUser: async (req, res) => {
        console.log('USER controller addUser: ', req.body)

        await query(`INSERT INTO user (full_name, nickname, email, password)
                           VALUES ('${req.body.full_name}','${req.body.nickname}','${req.body.email}','${ await bcrypt.hash(req.body.password, 16) }');`)

        res.redirect('/admin')

    },
    // MODIFY USER ADMIN
    modifyUser: async (req, res) => {
        console.log('USER controller modifyUser: ', req.body, req.params.id);
        if (req.body.password === '') {

            const sql = `UPDATE user 
                      SET
                         full_name  = '${req.body.full_name}',
                         nickname  = '${req.body.nickname}',
                         email     = '${req.body.email}',
                         is_verified = '${req.body.is_verified}',
                         is_admin    = '${req.body.is_admin}',
                         is_banned   = '${req.body.is_banned}',
                         update_date = CURRENT_TIMESTAMP
                      WHERE id = '${req.params.id}';`
            await query(sql)

            res.redirect('/admin')

        } else {

            const sql = `UPDATE user 
                     SET
                        full_name  = '${req.body.full_name}',
                        nickname  = '${req.body.nickname}',
                        email     = '${req.body.email}',
                        password  = '${ await bcrypt.hash(req.body.password, 16)}',
                        is_verified = '${req.body.is_verified}',
                        is_admin    = '${req.body.is_admin}',
                        is_banned   = '${req.body.is_banned}',
                        update_date = CURRENT_TIMESTAMP
                     WHERE id = '${req.params.id}';`
            await query(sql)

            res.redirect('/admin')


        }

    }
}