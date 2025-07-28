import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Clock, Zap, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { useToast } from "@/hooks/use-toast";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    const recipeText = `
${recipe.name}
Ready in: ${recipe.ready_in}
Calories: ~${recipe.calories_estimate}

Ingredients:
${recipe.ingredients_list.map((ingredient, index) => `${index + 1}. ${ingredient}`).join('\n')}

Instructions:
${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(recipeText);
      setCopied(true);
      toast({
        title: "Recipe copied!",
        description: "Recipe has been copied to your clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy recipe to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-fit bg-white/90 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold leading-tight">
            {recipe.name}
          </CardTitle>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge variant="secondary" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
              <Clock className="h-3 w-3 mr-1" />
              {recipe.ready_in}
            </Badge>
            <Badge variant="outline" className="text-xs border-orange-200 text-orange-600">
              <Zap className="h-3 w-3 mr-1" />
              ~{recipe.calories_estimate} cal
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {recipe.short_description}
        </p>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-2 h-auto font-medium hover:bg-orange-50 text-orange-600"
            >
              <span>View full recipe</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-2">
            {/* Ingredients */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-600">Ingredients:</h4>
              <ul className="space-y-1">
                {recipe.ingredients_list.map((ingredient, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-orange-500 font-medium mt-0.5">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-orange-600">Instructions:</h4>
              <ol className="space-y-2">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-3">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Copy Button */}
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="w-full mt-3 border-orange-200 hover:bg-orange-50"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Recipe
                </>
              )}
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}