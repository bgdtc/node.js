module.exports = {
    get: (req, res) => {
        console.log('404 error')
        res.render('404', {
            
            cook: (req.cookies.Cookie) ? true : false
        })
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
                                                 
             