//CONTROLLEUR NODEMAILER

//IMPORT DOTENV POUR LA CONFIG DE NODEMAILER
require('dotenv').config()

//IMPORT DE NODEMAILER
const nodemailer = require('nodemailer')

//CONFIGURATION DE NODEMAILER
transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    service: process.env.MAILER_SERVICE,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_EMAIL ,
        pass: process.env.MAILER_PASS
    }
})

//DÉCLARATION DES VARIABLES QUI SERONT UTILISÉS
let rand, mailOptions, host, link


module.exports = {
    //ENVOI DE MAIL AU SUBMIT DU FORM LOST PASSWORD
    lostPassword: async (req, res) => {
      const sql = `SELECT * FROM user WHERE email = '${req.body.email}'`
      await query(sql, (err, data) => {
              if (!data[0]) {
                  console.log('Une erreur est survenue')
                  res.render('auth', {
                      error: 'Une erreur est survenue'
                  })
              } else {
                  if (req.body.email === data[0].email) {
                      console.log('cest un succès:', data[0].email)
                        
                      rand = Math.floor((Math.random() * 100) + 54)
                      host = req.get('host')
                      link = "http://" + req.get('host') + "/auth/lost_pwd/" + rand

                      mailOptions = {
                          from: 'isec237@gmail.com',
                          to: data[0].email,
                          subject: 'votre nouveau mot de passe',
                          rand: rand,
                          html: `<h2>Votre demande de renouvellement de mot de passe</h2>
                                 <h5>Cliquez sur le lien ci-dessous pour renouveller votre mot de passe</h5>
                                 <a href=" ` + link + ` ">Cliquez ici pour mettre à jour votre mot de passe</a>`
                      }
                      console.log(mailOptions)
                      transporter.sendMail(mailOptions, (err, res, next) => {
                          if (err) {
                              console.log(err)
                              res.end("error")
                          } 
                          else {
                              console.log('Message Envoyé')
                              next()
                          }
                      })

                      res.render('home', {
                          success: 'Un mail à bien été envoyé à ' + req.body.email
                      })
                  } else {
                      console.log('Une erreur est survenue')
                      res.render('home ', {
                          error: 'Une erreur est survenue'
                      })
                  }
              }
         
      }) 
    },
    //ENVOI DE LA REQUETE SQL DE MODIFICATION DU PASSWORD
    editPassword: (req, res) => {
        console.log(req.protocol + "://" + req.get('host'))
        console.log('Page verify:')
        console.log(req.params.id)
        if (Number(req.params.id) !== rand) res.render('auth', { error: 'Une erreur est survenu !' })

        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            console.log('les informations proviennent de la bonne adresse mail')

            if (req.params.id == mailOptions.rand) {
                console.log('lemail est vérifié')

                res.render('editPassword', {
                    mailOptions
                })
          
            } else {
                console.log('email non vérifié')
                res.render('editPassword', {
                    error: 'bad request !'
                })
            }
        } else {
            res.render('editPassword', {
                error: 'requete provenant dune source incconue'
            })
        }
    },
  
}
