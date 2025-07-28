import groceryPattern from "@/assets/grocery-pattern.png";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, Utensils } from "lucide-react";
import { DietaryPreference, MaxCookTime } from "@/types/recipe";

interface IngredientInputProps {
  onSubmit: (
    ingredients: string,
    diet: DietaryPreference,
    maxTime: MaxCookTime
  ) => void;
  isLoading?: boolean;
}

const quickAddIngredients = [
  "eggs",
  "rice",
  "chicken breast",
  "tomatoes",
  "onions",
  "garlic",
  "spinach",
  "pasta",
  "cheese",
  "potatoes",
];

export function IngredientInput({ onSubmit, isLoading }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState<DietaryPreference>("None");
  const [maxTime, setMaxTime] = useState<MaxCookTime>("30");

  const addQuickIngredient = (ingredient: string) => {
    const current = ingredients.trim();
    if (current && !current.endsWith(",") && !current.endsWith(".")) {
      setIngredients(current + ", " + ingredient);
    } else {
      setIngredients(current + ingredient);
    }
  };

  const handleSubmit = () => {
    if (ingredients.trim()) {
      onSubmit(ingredients, diet, maxTime);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-pattern)] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${groceryPattern})`,
          backgroundSize: "1400px 1000px",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
        }}
      />
      
      <div className="relative z-10 p-4 pt-[15vh] w-full">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ChefHat className="h-8 w-8 text-orange-500 drop-shadow-lg" />
              <h1 className="text-4xl font-bold text-orange-500 bg-clip-text">
                Cook my Fridge
              </h1>
              <ChefHat className="h-8 w-8 text-orange-500 drop-shadow-lg" />
            </div>
            <p className="text-lg text-gray-800 font-bold drop-shadow-md [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]">
              Turn your leftover ingredients into delicious recipes
            </p>
          </div>

          {/* Main Input Card */}
          <Card className="p-6 shadow-[var(--shadow-cool)] bg-white/95 backdrop-blur-sm border">
            <div className="space-y-6">
              {/* Ingredients Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-orange-500" />
                  What's in your fridge?
                </label>
                <Textarea
                  placeholder="Type or paste what's in your fridge... e.g. 2 chicken breasts, spinach, feta cheese, pasta"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="min-h-24 text-base resize-none bg-background/50"
                />
              </div>

              {/* Quick Add Chips */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">
                  Quick add:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickAddIngredients.map((ingredient) => (
                    <Badge
                      key={ingredient}
                      variant="secondary"
                      className="cursor-pointer hover:bg-orange-500 hover:text-white transition-colors border-orange-200"
                      onClick={() => addQuickIngredient(ingredient)}
                    >
                      + {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dietary Preference */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Dietary preference
                  </label>
                  <Select
                    value={diet}
                    onValueChange={(value: DietaryPreference) => setDiet(value)}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Gluten-Free">Gluten-Free</SelectItem>
                      <SelectItem value="High-Protein">High-Protein</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Cook Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    Max cook time
                  </label>
                  <Select
                    value={maxTime}
                    onValueChange={(value: MaxCookTime) => setMaxTime(value)}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!ingredients.trim() || isLoading}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-lg transition-all duration-200"
              >
                {isLoading ? "Cooking up recipes..." : "Find Recipes"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
