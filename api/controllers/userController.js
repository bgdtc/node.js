exports.get =   (req, res) => {

    let sql = `SELECT user.is_verified FROM user WHERE id = 1;`;
    
     db.query(sql, (error, data) => {
        if (error) throw error;
        res.render('blog')
    })
}
