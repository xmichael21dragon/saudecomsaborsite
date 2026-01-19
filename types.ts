
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

export interface Comment {
  id: string;
  content_id: string;
  user_name: string;
  comment: string;
  rating?: number;
  created_at: string;
  type: 'recipe' | 'article';
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  image2?: string;
  difficulty: Difficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  diet: DietType;
  category: string;
  subcategory: string;
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
  image2?: string;
  category: string;
  subcategory?: string;
  date: string;
  readTime: string;
  author: string;
}

export type MealSlotType = 'Café da Manhã' | 'Lanche da Manhã' | 'Almoço' | 'Lanche da Tarde' | 'Jantar';

export interface MealPlanDay {
  day: string;
  meals: Record<MealSlotType, string | null>; 
}

export type MealPlan = MealPlanDay[];
