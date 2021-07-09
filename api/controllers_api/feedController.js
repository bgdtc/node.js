// CONTROLLEUR FEED RSS
module.exports = {
    get: async (req, res) => {
        res.json({
            layout: 'feed rsss'
        })
    }
}