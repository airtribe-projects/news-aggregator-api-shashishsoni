const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields: name, email, password' });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    next();
};

const validatePreferences = (req, res, next) => {
    const { preferences } = req.body;

    if (!Array.isArray(preferences)) {
        return res.status(400).json({ error: 'Preferences must be an array' });
    }

    next();
};

module.exports = { validateSignup, validateLogin, validatePreferences };

