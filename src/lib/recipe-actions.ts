import { Recipe, DietaryPreference, MaxCookTime } from "@/types/recipe";

export async function generate_recipes(
  ingredients: string,
  diet: DietaryPreference,
  max_time: MaxCookTime
): Promise<Recipe[]> {
  try {
    // This is a mock implementation - in a real app you'd use OpenAI API
    // For demo purposes, we'll return sample recipes based on ingredients
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    const sampleRecipes: Recipe[] = [
      {
        name: "Quick Herb Scrambled Eggs",
        ready_in: "10 min",
        calories_estimate: 320,
        short_description: "Fluffy eggs with fresh herbs and a touch of butter",
        ingredients_list: ["3 eggs", "2 tbsp butter", "Fresh herbs", "Salt", "Pepper"],
        steps: [
          "Beat eggs in a bowl with salt and pepper",
          "Heat butter in a non-stick pan over medium-low heat", 
          "Pour in eggs and gently scramble",
          "Add fresh herbs in the last minute",
          "Serve immediately while hot"
        ]
      },
      {
        name: "Mediterranean Rice Bowl",
        ready_in: "25 min", 
        calories_estimate: 450,
        short_description: "Aromatic rice with vegetables and Mediterranean flavors",
        ingredients_list: ["1 cup rice", "Tomatoes", "Olive oil", "Herbs", "Salt"],
        steps: [
          "Cook rice according to package instructions",
          "Dice tomatoes and heat olive oil in pan",
          "Sauté tomatoes with herbs and salt",
          "Mix cooked rice with tomato mixture",
          "Garnish with fresh herbs and serve"
        ]
      },
      {
        name: "Simple Veggie Stir-fry",
        ready_in: "15 min",
        calories_estimate: 280,
        short_description: "Quick and healthy vegetable medley with basic seasonings",
        ingredients_list: ["Mixed vegetables", "Oil", "Salt", "Pepper", "Herbs"],
        steps: [
          "Heat oil in a large pan or wok",
          "Add harder vegetables first",
          "Stir-fry for 5-7 minutes",
          "Season with salt, pepper, and herbs",
          "Serve hot as a side or main dish"
        ]
      }
    ];

    // Filter based on dietary preferences and time constraints
    let filteredRecipes = sampleRecipes;
    
    if (diet === "Vegetarian" || diet === "Vegan") {
      filteredRecipes = sampleRecipes.filter(recipe => 
        !recipe.ingredients_list.some(ing => 
          ing.toLowerCase().includes('chicken') || 
          ing.toLowerCase().includes('beef') ||
          ing.toLowerCase().includes('fish')
        )
      );
    }
    
    if (diet === "Vegan") {
      filteredRecipes = filteredRecipes.filter(recipe =>
        !recipe.ingredients_list.some(ing =>
          ing.toLowerCase().includes('egg') ||
          ing.toLowerCase().includes('butter') ||
          ing.toLowerCase().includes('cheese')
        )
      );
    }

    return filteredRecipes.slice(0, 6);
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw new Error('Failed to generate recipes. Please try again.');
  }
}