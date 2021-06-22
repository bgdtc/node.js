// CONTROLLEUR USER ???????
exports.deleteUserById = (req, res) => {
    console.log('Controller Delete User By ID', req.params.id)
    
    let sql = `DELETE
               FROM user
               WHERE id = ${ req.params.id };`;

    db.query(sql, (err) => {
        if (err) throw err;
        res.redirect('/admin')
    })
}