
export enum Difficulty {
  EASY = 'Fácil',
  MEDIUM = 'Médio',
  HARD = 'Difícil'
}

export enum DietType {
  VEGAN = 'Vegano',
  VEGETARIAN = 'Vegetariano',
  GLUTEN_FREE = 'Sem Glúten',
  LOW_CARB = 'Low Carb',
  NONE = 'Nenhum'
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  photo?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: Difficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  diet: DietType;
  category: string;
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
  rating: number;
  reviews: Review[];
  author: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'Doenças' | 'Nutrição' | 'Bem-estar' | 'Mental';
  date: string;
  readTime: string;
  author: string;
}

export interface MealPlanDay {
  day: string;
  meals: {
    id: string;
    recipeId: string;
    type: 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche';
  }[];
}

export type MealPlan = MealPlanDay[];
