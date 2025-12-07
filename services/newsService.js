const axios = require('axios');

class NewsService {
    constructor() {
        this.cache = new Map();
        this.cacheTTL = 5 * 60 * 1000; // 5 minutes
    }

    async fetchNews(preferences = []) {
        const cacheKey = preferences.sort().join(',');
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
            return cached.data;
        }

        try {
            // Try multiple news APIs in order of preference
            const news = await this.fetchFromGNews(preferences) || 
                        await this.fetchFromNewsAPI(preferences) ||
                        await this.getMockNews(preferences);

            this.cache.set(cacheKey, {
                data: news,
                timestamp: Date.now()
            });

            return news;
        } catch (error) {
            console.error('Error fetching news:', error.message);
            return this.getMockNews(preferences);
        }
    }

    async fetchFromGNews(preferences) {
        const apiKey = process.env.GNEWS_API_KEY;
        if (!apiKey) return null;

        try {
            const query = preferences.length > 0 ? preferences[0] : 'news';
            const response = await axios.get('https://gnews.io/api/v4/search', {
                params: {
                    q: query,
                    token: apiKey,
                    lang: 'en',
                    max: 10
                },
                timeout: 5000
            });

            if (response.data && response.data.articles) {
                return response.data.articles.map(article => ({
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    image: article.image,
                    publishedAt: article.publishedAt,
                    source: article.source?.name || 'Unknown'
                }));
            }
        } catch (error) {
            // Silently fail and try next API
        }
        return null;
    }

    async fetchFromNewsAPI(preferences) {
        const apiKey = process.env.NEWSAPI_KEY;
        if (!apiKey) return null;

        try {
            const query = preferences.length > 0 ? preferences[0] : 'general';
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: query,
                    apiKey: apiKey,
                    pageSize: 10,
                    sortBy: 'publishedAt'
                },
                timeout: 5000
            });

            if (response.data && response.data.articles) {
                return response.data.articles.map(article => ({
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    image: article.urlToImage,
                    publishedAt: article.publishedAt,
                    source: article.source?.name || 'Unknown'
                }));
            }
        } catch (error) {
            // Silently fail and try next API
        }
        return null;
    }

    getMockNews(preferences) {
        // Return mock news when APIs are unavailable
        const categories = preferences.length > 0 ? preferences : ['general'];
        const category = categories[0];

        return [
            {
                title: `${category.charAt(0).toUpperCase() + category.slice(1)} News Article 1`,
                description: `This is a sample news article about ${category}.`,
                url: 'https://example.com/news/1',
                image: null,
                publishedAt: new Date().toISOString(),
                source: 'Mock News'
            },
            {
                title: `${category.charAt(0).toUpperCase() + category.slice(1)} News Article 2`,
                description: `Another sample news article about ${category}.`,
                url: 'https://example.com/news/2',
                image: null,
                publishedAt: new Date().toISOString(),
                source: 'Mock News'
            }
        ];
    }
}

module.exports = new NewsService();

