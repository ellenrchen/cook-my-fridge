export interface Recipe {
  name: string;
  ready_in: string;
  calories_estimate: number;
  short_description: string;
  ingredients_list: string[];
  steps: string[];
}

export type DietaryPreference = "None" | "Vegetarian" | "Vegan" | "Gluten-Free" | "High-Protein";
export type MaxCookTime = "15" | "30" | "45";