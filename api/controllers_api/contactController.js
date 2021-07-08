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
        res.json('contact')
    },
    sendContact: async (req, res) => {

        const mailOptions = {
            from: 'isec237@gmail.com',
            to: 'isec237@gmail.com',
            subject: 'sujettest',
            html: `<h3>htmltest</h3>`
        }
        
       

        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) console.log(err)
            console.log(info)
           
            res.json({
                message: await query(`SELECT * FROM comments`)
            })

        })

        const sql = `INSERT INTO messages (subject, content, email, full_name) VALUES ('test', 'tessst', 'ttteest', 'ttttestt')`
        await query(sql) 
    }
}