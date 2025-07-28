import { useState } from "react";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeResults } from "@/components/RecipeResults";
import { generate_recipes } from "@/lib/recipe-actions";
import { Recipe, DietaryPreference, MaxCookTime } from "@/types/recipe";

const Index = () => {
  const [currentView, setCurrentView] = useState<'input' | 'results'>('input');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState<{
    ingredients: string;
    diet: DietaryPreference;
    maxTime: MaxCookTime;
  } | null>(null);

  const handleSearch = async (ingredients: string, diet: DietaryPreference, maxTime: MaxCookTime) => {
    setIsLoading(true);
    setCurrentView('results');
    setLastSearch({ ingredients, diet, maxTime });
    
    try {
      const generatedRecipes = await generate_recipes(ingredients, diet, maxTime);
      setRecipes(generatedRecipes);
    } catch (error) {
      console.error('Error generating recipes:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastSearch) {
      handleSearch(lastSearch.ingredients, lastSearch.diet, lastSearch.maxTime);
    }
  };

  const handleBack = () => {
    setCurrentView('input');
  };

  if (currentView === 'results') {
    return (
      <RecipeResults
        recipes={recipes}
        isLoading={isLoading}
        onBack={handleBack}
        onRegenerate={handleRegenerate}
      />
    );
  }

  return (
    <IngredientInput
      onSubmit={handleSearch}
      isLoading={isLoading}
    />
  );
};

export default Index;
