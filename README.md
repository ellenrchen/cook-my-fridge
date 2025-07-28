# Cook My Fridge 🍳

Turn your leftover ingredients into delicious recipes with AI-powered suggestions!

This project consists of a React frontend and a Node.js backend API for secure recipe generation.

## 🚀 Quick Deploy (E2E Production)

### 1. Deploy Backend to Railway
1. **Push to GitHub** (if you haven't already):
   ```bash
   git add .
   git commit -m "Add backend and frontend"
   git push origin main
   ```

2. **Deploy Backend:**
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "Deploy from GitHub repo"
   - Select your `cook-my-fridge` repository
   - Choose the `backend` folder as the root
   - Set environment variable: `OPENAI_API_KEY=your_actual_openai_key`
   - Deploy!
   - **Copy the deployed URL** (e.g., `https://cook-my-fridge-backend-production.up.railway.app`)

### 2. Configure Frontend for Production
1. **Create `.env.production`** in the root directory:
   ```bash
   VITE_API_URL=https://your-backend-url-from-railway.app
   ```

2. **Update Lovable deployment:**
   - Push the updated code to GitHub
   - The Lovable auto-deployment will pick up the changes
   - Your frontend will now use the production backend!

### 3. Test End-to-End
- Visit your Lovable URL
- Try generating recipes
- Should work with real OpenAI API calls!

## 🏗️ Local Development

### 1. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Copy environment file
cp .env.example .env

# Add your OpenAI API key to .env file
# OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 3. Get OpenAI API Key
1. Visit [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create an account if needed
3. Generate a new API key
4. Add it to `backend/.env`

### 4. Start Both Servers
```bash
# Terminal 1 - Start backend (from /backend directory)
npm run dev

# Terminal 2 - Start frontend (from root directory)
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: Vite + React + TypeScript
- **UI**: Tailwind CSS + shadcn/ui components
- **Features**: Ingredient input, dietary preferences, recipe display

### Backend (Node.js + Express)
- **Framework**: Express.js
- **AI Integration**: OpenAI GPT-4 API
- **Security**: Server-side API key management
- **Features**: Recipe generation, input validation, error handling

## 🔒 Security

✅ **API Key Protection**: OpenAI API key is stored securely on the backend  
✅ **No Browser Exposure**: API key never sent to the client  
✅ **CORS Configuration**: Proper cross-origin resource sharing  
✅ **Input Validation**: Server-side request validation  

## 📦 Project Structure

```
cook-my-fridge/
├── src/                    # Frontend React app
│   ├── components/         # UI components
│   ├── lib/               # Utilities and API calls
│   └── types/             # TypeScript definitions
├── backend/               # Backend API server
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment template
└── package.json           # Frontend dependencies
```

## 🛠️ Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server
```

## 🌟 Features

- **Ingredient-Based Recipe Generation**: Enter available ingredients
- **Dietary Preferences**: Support for various dietary restrictions
- **Time Constraints**: Filter by cooking time
- **AI-Powered**: Uses GPT-4 for creative recipe suggestions
- **Responsive Design**: Works on desktop and mobile
- **Real-time Generation**: Fast API responses

## 🚀 Deployment Options

### Production (Recommended)
- **Frontend**: Lovable, Vercel, Netlify
- **Backend**: Railway, Render, Heroku

### Development
- **Frontend**: `npm run dev` (Vite dev server)
- **Backend**: `npm run dev` (nodemon with auto-restart)

## 🔧 Troubleshooting

### Backend Won't Start
- Check if you have an OpenAI API key in `backend/.env`
- Ensure port 3001 is available
- Run `npm install` in the backend directory

### Frontend Can't Connect to Backend
- Make sure backend is running on port 3001
- Check browser console for CORS errors
- Verify `VITE_API_URL` in frontend environment if custom

### OpenAI API Errors
- Verify your API key is valid
- Check your OpenAI account has credits
- Review rate limits in OpenAI dashboard

### Production Issues
- Ensure `VITE_API_URL` points to your deployed backend
- Check Railway logs for backend errors
- Verify OpenAI API key is set in production environment

## 📝 License

MIT License - feel free to use this project for learning and development!
