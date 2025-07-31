const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173',           // Vite dev server
    'http://localhost:3000',           // React dev server  
    'http://localhost:8080',           // Alternative dev server
    /\.lovable\.dev$/,                 // Lovable deployment
    /\.vercel\.app$/,                  // Vercel deployment
    /\.netlify\.app$/,                 // Netlify deployment
    /\.railway\.app$/,                 // Railway frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Cook My Fridge API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Recipe generation endpoint
app.post("/api/generate-recipes", async (req, res) => {
  try {
    const { ingredients, diet, max_time } = req.body;

    // Validate input
    if (!ingredients || !diet || !max_time) {
      return res.status(400).json({
        error: "Missing required fields: ingredients, diet, max_time",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OpenAI API key not configured on server",
      });
    }

    // Convert max_time to minutes for the prompt
    const timeMapping = {
      "15 min": 15,
      "30 min": 30,
      "1 hour": 60,
      "2+ hours": 120,
    };
    const maxMinutes = timeMapping[max_time];

    const prompt = `Generate 3-6 unique recipes using these ingredients: "${ingredients}".

Requirements:
- Dietary preference: ${diet}
- Maximum cooking time: ${max_time} (${maxMinutes} minutes)
- Each recipe should use at least some of the provided ingredients
- Include creative combinations and cooking methods
- Make recipes practical and achievable
- Include detailed cooking instructions with specific temperatures and heat levels
- You may assume the user has standard seasonings and spices in their pantry, but do not assume they have any specific ingredients.

IMPORTANT: Respond with ONLY a valid JSON array. No explanatory text before or after.

For cooking instructions, be specific about:
- Oven temperatures (e.g., "Preheat oven to 375°F")
- Pan heat levels (e.g., "medium-high heat", "low heat")
- Cooking times for each step
- Internal temperatures for meat/poultry when applicable
- Visual cues for doneness

JSON format (respond with this exact structure):
[
  {
    "name": "Recipe Name",
    "ready_in": "X min",
    "calories_estimate": 300,
    "short_description": "Brief description",
    "ingredients_list": ["ingredient 1", "ingredient 2"],
    "steps": ["step 1 with specific temperature/heat", "step 2 with cooking details"]
  }
]

Return ONLY the JSON array, nothing else.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a professional chef and recipe developer. Generate creative, practical recipes based on available ingredients and dietary preferences. Always respond with valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenAI API");
    }

    // Parse the JSON response
    let recipes;
    try {
      console.log("Raw OpenAI response:", response);

      // Try to extract JSON from the response if it's wrapped in text
      let jsonString = response.trim();

      // Look for JSON array in the response
      const jsonMatch = jsonString.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }

      recipes = JSON.parse(jsonString);
      console.log("Parsed recipes:", recipes);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", response);
      console.error("Parse error:", parseError.message);
      return res.status(500).json({
        error: "Invalid response format from AI. Please try again.",
      });
    }

    // Validate and filter recipes
    const validRecipes = recipes.filter((recipe) => {
      return (
        recipe.name &&
        recipe.ready_in &&
        recipe.calories_estimate &&
        recipe.short_description &&
        Array.isArray(recipe.ingredients_list) &&
        Array.isArray(recipe.steps)
      );
    });

    if (validRecipes.length === 0) {
      return res.status(500).json({
        error: "No valid recipes generated. Please try again.",
      });
    }

    res.json({
      success: true,
      recipes: validRecipes.slice(0, 6),
    });
  } catch (error) {
    console.error("Error generating recipes:", error);

    if (error.status === 401) {
      res.status(500).json({
        error: "Invalid OpenAI API key configured on server",
      });
    } else if (error.status === 429) {
      res.status(429).json({
        error: "Rate limit exceeded. Please try again later.",
      });
    } else {
      res.status(500).json({
        error: "Failed to generate recipes. Please try again.",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cook My Fridge API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);

  if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️  OPENAI_API_KEY not found in environment variables");
  } else {
    console.log("✅ OpenAI API key configured");
  }
});

