module.exports = {
    get: (req, res) => {
        const sql = `SELECT user.is_admin FROM user WHERE id = 1;`
        db.query(sql, (error, data) => {
            if (error) console.log(error);
            if (data[0].is_admin === 1) {
                res.render('admin', {
                    layout: 'secondary.hbs',
                    error: 'vous netes pas admin'
                })
            } else {
                const sql2 = `SELECT * FROM user;`
                db.query(sql2, (error, data1) =>{
                if (error) console.log(error)
                res.render('admin', {
                    admin: 'admin',
                    layout: 'secondary.hbs',
                    full_name: data1[0].full_name,
                    email: data1[0].email,
                    is_verified: data1[0].is_verified
                })
                })
                
            }
        })
        
    }
}
