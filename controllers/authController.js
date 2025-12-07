const userModel = require('../models/User');
const { generateToken } = require('../middleware/auth');

const signup = async (req, res) => {
    try {
        const { name, email, password, preferences } = req.body;
        
        const user = await userModel.createUser({ name, email, password, preferences });
        
        res.status(200).json({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findByEmail(email);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValidPassword = await userModel.verifyPassword(user, password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(email);
        
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signup, login };

