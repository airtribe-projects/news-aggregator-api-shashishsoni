const userModel = require('../models/User');
const newsService = require('../services/newsService');

const getNews = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await userModel.findByEmail(email);
        
        const preferences = user ? user.preferences : [];
        const news = await newsService.fetchNews(preferences);
        
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getNews };

