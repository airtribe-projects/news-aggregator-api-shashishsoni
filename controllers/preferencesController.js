const userModel = require('../models/User');

const getPreferences = async (req, res) => {
    try {
        const { email } = req.user;
        const preferences = await userModel.getPreferences(email);
        
        res.status(200).json({ preferences });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePreferences = async (req, res) => {
    try {
        const { email } = req.user;
        const { preferences } = req.body;
        
        const updatedPreferences = await userModel.updatePreferences(email, preferences);
        
        res.status(200).json({ 
            message: 'Preferences updated successfully',
            preferences: updatedPreferences 
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getPreferences, updatePreferences };

