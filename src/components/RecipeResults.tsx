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
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto shadow-[var(--shadow-warm)]">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <ChefHat className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold">Cooking up something special...</h2>
            <p className="text-muted-foreground">
              Our AI chef is analyzing your ingredients and creating personalized recipes just for you.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-6xl mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold">Your Recipe Suggestions</h1>
            <p className="text-muted-foreground">
              Found {recipes.length} delicious recipe{recipes.length !== 1 ? 's' : ''} for you
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={onRegenerate}
            className="shrink-0"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        </div>

        {/* Results Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center max-w-md mx-auto shadow-[var(--shadow-soft)]">
            <CardContent className="space-y-4">
              <div className="text-4xl">🤔</div>
              <h2 className="text-xl font-semibold">No recipes found</h2>
              <p className="text-muted-foreground">
                Try adjusting your ingredients or dietary preferences and search again.
              </p>
              <Button onClick={onBack} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}