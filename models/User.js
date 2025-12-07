const bcrypt = require('bcrypt');

class UserModel {
    constructor() {
        this.users = new Map();
    }

    async createUser(userData) {
        const { email, password, name, preferences } = userData;
        
        if (this.users.has(email)) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = {
            email,
            password: hashedPassword,
            name,
            preferences: preferences || []
        };

        this.users.set(email, user);
        return { email, name, preferences: user.preferences };
    }

    async findByEmail(email) {
        return this.users.get(email) || null;
    }

    async verifyPassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }

    async updatePreferences(email, preferences) {
        const user = this.users.get(email);
        if (!user) {
            throw new Error('User not found');
        }
        user.preferences = preferences;
        this.users.set(email, user);
        return user.preferences;
    }

    async getPreferences(email) {
        const user = this.users.get(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user.preferences;
    }
}

module.exports = new UserModel();

