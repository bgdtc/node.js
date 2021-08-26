module.exports = async (req, res, next) => {
    if (req.session.user) {
        const isVerified = await query(`SELECT is_verified FROM user where id = ${req.session.user.id}`)
        const isBanned = await  query(`SELECT is_banned FROM user where id = ${req.session.user.id}`)
        if (isVerified[0].is_verified === 1 && isBanned[0].is_banned === 0) {
            next();
        } else {
            res.json({
                error: 'non'
            })
        }

    } else {
        res.json({
            error: 'non'
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
                                                 
             