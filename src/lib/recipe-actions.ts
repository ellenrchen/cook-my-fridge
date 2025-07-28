import { Recipe, DietaryPreference, MaxCookTime } from "@/types/recipe";

// Backend API URL - update this if your backend runs on a different port
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function generate_recipes(
  ingredients: string,
  diet: DietaryPreference,
  max_time: MaxCookTime
): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients,
        diet,
        max_time
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success || !Array.isArray(data.recipes)) {
      throw new Error('Invalid response format from server');
    }

    return data.recipes;
  } catch (error) {
    console.error('Error generating recipes:', error);
    
    if (error instanceof Error) {
      // Network errors or server errors
      if (error.message.includes('fetch')) {
        throw new Error('Cannot connect to recipe server. Please make sure the backend is running.');
      }
      throw error;
    }
    
    throw new Error('Failed to generate recipes. Please try again.');
  }
}