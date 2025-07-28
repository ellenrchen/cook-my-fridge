# Cook My Fridge - Backend API

This is the backend API server for the Cook My Fridge application. It provides secure recipe generation using the OpenAI API.

## 🚀 Quick Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/HxpHiA)

1. Click the "Deploy on Railway" button above
2. Connect your GitHub account
3. Set your `OPENAI_API_KEY` environment variable
4. Deploy!

Your API will be available at: `https://your-app-name.railway.app`

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=3001
   ```

3. **Get your OpenAI API Key:**
   - Visit [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create an account if needed
   - Generate a new API key
   - Copy the key to your `.env` file

## Running the Server

### Development (with auto-restart):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## Deployment

### Railway (Recommended)
1. Push your code to GitHub
2. Connect Railway to your GitHub repo
3. Set environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: Will be set automatically by Railway
4. Deploy!

### Other Platforms
- **Render**: Connect GitHub repo, set environment variables
- **Heroku**: Use `git push heroku main`
- **Vercel**: Deploy as serverless functions

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Generate Recipes
- **POST** `/api/generate-recipes`
- Body:
  ```json
  {
    "ingredients": "tomatoes, eggs, cheese",
    "diet": "Vegetarian",
    "max_time": "30 min"
  }
  ```

## Security Features

- ✅ API key stored securely on server
- ✅ CORS enabled for frontend communication
- ✅ Input validation
- ✅ Error handling
- ✅ No API key exposure to browser

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 3001, set automatically in production) 