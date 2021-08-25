exports.activateCookies = async (req, res, next) => {
         console.log('test new cookie')
         res.cookie('Cookie',{
             domain: 'localhost',
             path: '/',
             secure: true,
             httpOnly: true,
             resave: false
         })
        res.redirect('back')
}

// exports.getCookies = async (req,res) => {
//     const CCookie = req.cookies.Cookie
//     console.log(req.path);
//     res.render(`${req.path.slice(1)}`, {
//         cook: CCookie
//     })
// }


// $$$$$$$\   $$$$$$\  $$$$$$$\ $$$$$$$$\  $$$$$$\  
// $$  __$$\ $$  __$$\ $$  __$$\\__$$  __|$$  __$$\ 
// $$ |  $$ |$$ /  \__|$$ |  $$ |  $$ |   $$ /  \__|
// $$$$$$$\ |$$ |$$$$\ $$ |  $$ |  $$ |   $$ |      
// $$  __$$\ $$ |\_$$ |$$ |  $$ |  $$ |   $$ |      
// $$ |  $$ |$$ |  $$ |$$ |  $$ |  $$ |   $$ |  $$\ 
// $$$$$$$  |\$$$$$$  |$$$$$$$  |  $$ |   \$$$$$$  |
// \_______/  \______/ \_______/   \__|    \______/ 
                                                 
             