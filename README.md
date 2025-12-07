# News Aggregator API

A RESTful API for a personalized news aggregator built with Node.js and Express.js. This API provides user authentication, preference management, and personalized news article aggregation from multiple external news sources.

## Features

- 🔐 **User Authentication**: Secure signup and login with JWT tokens and bcrypt password hashing
- ⚙️ **User Preferences**: Manage personalized news preferences
- 📰 **News Aggregation**: Fetch personalized news articles based on user preferences
- 🔄 **Caching**: 5-minute TTL cache for news articles to reduce API calls
- 🌐 **External API Integration**: Support for multiple news APIs (GNews, NewsAPI) with fallback to mock data
- ✅ **Input Validation**: Comprehensive request validation and error handling
- 🔒 **Token-based Security**: JWT authentication for protected routes

## Tech Stack

- **Node.js** (>= 18.0.0)
- **Express.js** - Web framework
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **axios** - HTTP client for external APIs
- **dotenv** - Environment variable management

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-aggregator-api-shashishsoni
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your-secret-key-change-in-production
   GNEWS_API_KEY=your-gnews-api-key
   NEWSAPI_KEY=your-newsapi-key
   PORT=3000
   ```
   
   **Note**: The API works without these keys but will use mock data for news. To get real news:
   - [GNews API](https://gnews.io/) - 100 requests/day (free tier)
   - [NewsAPI](https://newsapi.org/) - 100 requests/day (free tier)

4. **Start the server**
   ```bash
   node app.js
   ```
   
   The server will start on `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm test
```

All tests should pass. The test suite covers:
- User signup and validation
- User login and authentication
- Password verification
- Preferences management
- News fetching
- Authorization checks

## API Endpoints

### Authentication

#### POST `/users/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "preferences": ["technology", "science"]
}
```

**Response:** `200 OK`
```json
{
  "message": "User created successfully",
  "user": {
    "email": "john@example.com",
    "name": "John Doe",
    "preferences": ["technology", "science"]
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields or invalid input
- `400 Bad Request` - User already exists

---

#### POST `/users/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid email or password

---

### User Preferences

#### GET `/users/preferences`
Get user's news preferences.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "preferences": ["technology", "science", "movies"]
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

---

#### PUT `/users/preferences`
Update user's news preferences.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "preferences": ["technology", "science", "movies", "games"]
}
```

**Response:** `200 OK`
```json
{
  "message": "Preferences updated successfully",
  "preferences": ["technology", "science", "movies", "games"]
}
```

**Error Responses:**
- `400 Bad Request` - Preferences must be an array
- `401 Unauthorized` - Missing or invalid token

---

### News

#### GET `/news`
Get personalized news articles based on user preferences.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "news": [
    {
      "title": "Technology News Article 1",
      "description": "This is a sample news article about technology.",
      "url": "https://example.com/news/1",
      "image": null,
      "publishedAt": "2024-01-15T10:00:00.000Z",
      "source": "Mock News"
    },
    {
      "title": "Technology News Article 2",
      "description": "Another sample news article about technology.",
      "url": "https://example.com/news/2",
      "image": null,
      "publishedAt": "2024-01-15T10:05:00.000Z",
      "source": "Mock News"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

**Note**: News articles are cached for 5 minutes. If external API keys are not configured, the API returns mock news data.

---

## Project Structure

```
news-aggregator-api-shashishsoni/
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── README.md                   # Project documentation
│
├── models/
│   └── User.js                # User model with in-memory storage
│
├── controllers/
│   ├── authController.js      # Authentication logic (signup/login)
│   ├── preferencesController.js # Preferences management
│   └── newsController.js      # News fetching logic
│
├── routes/
│   ├── users.js               # User-related routes
│   └── news.js                # News-related routes
│
├── middleware/
│   ├── auth.js                # JWT authentication middleware
│   └── validation.js          # Input validation middleware
│
├── services/
│   └── newsService.js         # External news API integration & caching
│
└── test/
    └── server.test.js         # Test suite
```

## Architecture

- **Models**: Data layer with in-memory storage (Map-based)
- **Controllers**: Business logic and request handling
- **Routes**: Endpoint definitions and middleware chaining
- **Middleware**: Authentication and validation
- **Services**: External API integration and caching logic

## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 24 hours
- Protected routes require valid Bearer token
- Input validation on all endpoints
- Error messages don't expose sensitive information

## Caching Strategy

News articles are cached in memory with a 5-minute TTL (Time To Live). This reduces external API calls and improves response times. Cache keys are based on user preferences.

## Error Handling

The API provides consistent error responses:
- `400 Bad Request` - Validation errors or missing fields
- `401 Unauthorized` - Authentication failures
- `500 Internal Server Error` - Server-side errors

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Rate limiting
- News article search and filtering
- Bookmarking functionality
- News history tracking
- Multiple news source aggregation
- Real-time news updates via WebSockets

## License

ISC

## Author

Airtribe
