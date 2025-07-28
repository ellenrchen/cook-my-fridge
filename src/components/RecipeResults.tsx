import groceryPattern from '@/assets/grocery-pattern.png';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, ChefHat } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";

interface RecipeResultsProps {
  recipes: Recipe[];
  isLoading: boolean;
  onBack: () => void;
  onRegenerate: () => void;
}

export function RecipeResults({ recipes, isLoading, onBack, onRegenerate }: RecipeResultsProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-pattern)] relative overflow-hidden flex items-center justify-center p-4">
              {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url(${groceryPattern})`,
          backgroundSize: '1400px 1000px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0'
        }}
      />
        <Card className="relative z-10 p-8 text-center max-w-md mx-auto shadow-lg bg-white/95 backdrop-blur-sm border">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <ChefHat className="h-12 w-12 text-orange-500 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold">Cooking up something special...</h2>
            <p className="text-gray-700">
              Our AI chef is analyzing your ingredients and creating personalized recipes just for you.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-pattern)] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url(${groceryPattern})`,
          backgroundSize: '1400px 1000px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0'
        }}
      />
      
      <div className="relative z-10 p-4">
      <div className="max-w-6xl mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="w-full">
          {/* Top row with buttons and title */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="default"
              onClick={onBack}
              className="shrink-0 bg-white/90 hover:bg-white text-gray-700 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-orange-500 drop-shadow-lg" />
              <h1 className="text-3xl text-orange-500 bg-clip-text ">
                Your Recipe Suggestions
              </h1>
              <ChefHat className="h-6 w-6 text-orange-500 drop-shadow-lg" />
            </div>
            
            <Button
              variant="default"
              onClick={onRegenerate}
              className="shrink-0 bg-white/90 hover:bg-white text-gray-700 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
          
          {/* Subtitle */}
          <div className="text-center">
            <p className="text-gray-800 font-bold">
              Found {recipes.length} delicious recipe{recipes.length !== 1 ? 's' : ''} for you
            </p>
          </div>
        </div>

        {/* Results Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center max-w-md mx-auto shadow-lg bg-white/95 backdrop-blur-sm border">
            <CardContent className="space-y-4">
              <div className="text-4xl">🤔</div>
              <h2 className="text-xl font-semibold">No recipes found</h2>
              <p className="text-gray-700">
                Try adjusting your ingredients or dietary preferences and search again.
              </p>
              <Button onClick={onBack} variant="outline" className="border-orange-200 hover:bg-orange-50">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
}