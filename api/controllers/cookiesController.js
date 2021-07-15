exports.activateCookies = async (req, res, next) => {
         console.log('test new cookie')
         res.cookie('Cookie',{
             domain: 'localhost',
             path: '/',
             secure: true,
             httpOnly: true,
             resave: false
         })
    res.redirect('/')
}