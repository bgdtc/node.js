//CONTROLLEUR ADMIN GET PAGE ADMIN

module.exports = {
    //GET PAGE ADMIN
    get: async (req, res) => {
        //si l'utilisateur est connecté
        if (req.session.user) {
            const isAdmin = await query(`SELECT user.is_admin FROM user WHERE id = ${req.session.user.id}`)
            //si l'utilisateur connecté est administrateur
            if (isAdmin[0].is_admin === 1) {
                res.json({
                    dbuser: await query(`SELECT * FROM user;`),
                    dbComments: await query(`SELECT * FROM comments;`),
                    dbArticles: await query(`SELECT * FROM articles;`),
                    dbMessage: await query(`SELECT * FROM messages;`)
                })
                //si l'utilisateur connecté n'est pas administrateur
            } else {
                res.json({
                    error: 'pas admin'
                })


            }
            //si l'utilisateur n'est pas connecté
        } else {
            res.json({
                error: 'pas admin'
            })
        }
    },
    sendMessage: async (req, res) => {
        console.log('CONTROLLER sendMessage:', req.body)

        const mailOptions = {
            from: 'isec237@gmail.com',
            to: req.body.email,
            subject: req.body.subject,
            html: `<h3>${req.body.content}</h3>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.json('/admin')
            }

        })
        const sql = `INSERT INTO messages (subject, content, email, full_name) VALUES ('${req.body.subject}', '${req.body.content}', '${req.body.email}', 'ADMIN')`
        await query(sql)

    },
    deleteMessage: async (req, res) => {
        console.log('CONTROLLEUR delete message:', req.body)

        const sql = `DELETE FROM messages WHERE id = ?`;
        let values = [req.params.id];

        await query(sql, [values])
        res.json('/admin')
    }

}