//CONTROLLEUR USER

//IMPORT DE BCRYPT POUR LES PASSWORD HASH
const bcrypt = require('bcrypt');


module.exports = {
    // DELETE USER BY ID ADMIN
    deleteUserById: async (req, res) => {

        let sql = `DELETE FROM user  WHERE id = ${req.params.id}`;
        await query(sql)

        res.json({
            message: await query(`SELECT * FROM user`)
        })
    },
    // ADD USER ADMIN
    addUser: async (req, res) => {

        let rand = Math.floor(Math.random() * 100)
        await query(`INSERT INTO user (full_name, nickname, email, password)
    VALUES ('user${rand}','user${rand}','mail${rand}@f.fr','bite${rand}')`)
        res.json({
            message: await query(`SELECT * FROM user`)
        })

    },
    // MODIFY USER ADMIN
    modifyUser: async (req, res) => {
        console.log('USER controller modifyUser: ', req.body, req.params.id);
        let rand = Math.floor(Math.random() * 1000)

        const sql = `UPDATE user 
                      SET
                         full_name  = 'modif${rand}',
                         nickname  = 'modif${rand}',
                         email     = 'modif${rand}',
                         is_verified = '0',
                         is_admin    = '0',
                         is_banned   = '0',
                         update_date = CURRENT_TIMESTAMP
                      WHERE id = '${req.params.id}';`
        await query(sql)

        res.json({
            message: await query(`SELECT * FROM user`)

        })


    }


}