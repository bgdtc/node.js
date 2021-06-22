// CONTROLLEUR MON COMPTE
module.exports = {
    get: async(req, res) => {
        const sql = `SELECT user.nickname FROM user where id = 1`
        db.query(sql, (error, data) => {
            if (error) throw error;
            res.render('account', {
                success: 'bonjour: ' + data[0].nickname + ' vous êtes bien connecté'
            })      
        })
      
    }
}