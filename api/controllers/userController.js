exports.get =   (req, res) => {

    let sql = `SELECT * FROM user`;
    
    
     db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            listUser: data,
            message: "users lists retrieved successfullt"        
        }),
        console.log(data.full_name);
        
    })
}
