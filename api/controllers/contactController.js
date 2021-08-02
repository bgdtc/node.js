// CONTROLLEUR CONTACT

//DOTENV POUR CONFIG NODEMAILER
require('dotenv').config()

//NODEMAILER POUR ENVOYER UN MESSAGE
const nodemailer = require('nodemailer')

//CONFIGURATION DE NODEMAILER
transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    service: process.env.MAILER_SERVICE,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS
    }
})

//DÉCLARATION DES VARIABLES QUI SERONT UTILISÉS
let mailOptions



module.exports = {
    get: async (req, res) => {
        res.render('contact',{
            cook: (req.cookies.Cookie) ? true : false
        })
    },
    sendContact: async (req, res) => {

        console.log('CONTROLLER sendContact:', req.body)

        const mailOptions = {
            from: 'isec237@gmail.com',
            to: 'isec237@gmail.com',
            subject: req.body.subject,
            html: `<h3>${req.body.content}</h3>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.render('contact', {
                    success: 'votre message à bien été transmit',
                    cook: (req.cookies.Cookie) ? true : false
                })
            }
        })

        const sql = `INSERT INTO messages (subject, content, email, full_name) VALUES ('${req.body.subject}', '${req.body.content}', '${req.body.email}', '${req.body.full_name}')`
        await query(sql)
    }
}



// $$$$$$$\   $$$$$$\  $$$$$$$\ $$$$$$$$\  $$$$$$\  
// $$  __$$\ $$  __$$\ $$  __$$\\__$$  __|$$  __$$\ 
// $$ |  $$ |$$ /  \__|$$ |  $$ |  $$ |   $$ /  \__|
// $$$$$$$\ |$$ |$$$$\ $$ |  $$ |  $$ |   $$ |      
// $$  __$$\ $$ |\_$$ |$$ |  $$ |  $$ |   $$ |      
// $$ |  $$ |$$ |  $$ |$$ |  $$ |  $$ |   $$ |  $$\ 
// $$$$$$$  |\$$$$$$  |$$$$$$$  |  $$ |   \$$$$$$  |
// \_______/  \______/ \_______/   \__|    \______/ 
                                                 
             