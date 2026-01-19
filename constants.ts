
import { Recipe, Difficulty, DietType, Article } from './types';

export const WP_CONFIG = {
  baseUrl: 'https://seu-site-wordpress.com/wp-json/wp/v2',
  useExternalAPI: false,
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Smoothie Bowl de Frutas Vermelhas e Chia Antiox',
    description: 'Smoothie rico em antioxidantes e fibras para começar o dia.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Receitas Fitness',
    ingredients: ['200g de morangos', '1 banana', '1 colher de chia'],
    instructions: ['Bata tudo no liquidificador até ficar cremoso.'],
    nutrition: { calories: 280, protein: 5, carbs: 42, fat: 7, fiber: 12 },
    rating: 4.9,
    reviews: [],
    author: 'Nutri Chef'
  },
  {
    id: '2',
    title: 'Salmão Grelhado com Amêndoas',
    description: 'Refeição proteica com gorduras boas.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    diet: DietType.LOW_CARB,
    category: 'Receitas',
    subcategory: 'Carnes e Peixes',
    ingredients: ['2 filés de salmão', 'Amêndoas laminadas'],
    instructions: ['Tempere e grelhe por 5 minutos de cada lado.'],
    nutrition: { calories: 350, protein: 34, carbs: 4, fat: 22, fiber: 3 },
    rating: 5.0,
    reviews: [],
    author: 'Chef Saudável'
  },
  {
    id: '3',
    title: 'Suco Verde Energizante',
    description: 'O clássico detox para o dia a dia.',
    image: 'https://images.unsplash.com/photo-1610970882799-64a3e1d20928?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Bebidas e Sucos',
    ingredients: ['Couve', 'Maçã', 'Gengibre'],
    instructions: ['Bata tudo e beba sem coar para manter as fibras.'],
    nutrition: { calories: 80, protein: 2, carbs: 18, fat: 0, fiber: 4 },
    rating: 4.8,
    reviews: [],
    author: 'Nutri Chef'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Higiene do Sono: Como Dormir Melhor',
    excerpt: 'Dormir bem é o segredo para a longevidade.',
    content: 'O sono reparador é fundamental...',
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '10 Jun, 2024',
    readTime: '8 min',
    author: 'Dra. Maria Sono'
  },
  {
    id: 'a2',
    title: 'Benefícios da Caminhada Diária',
    excerpt: 'Um guia sobre como 30 minutos por dia podem mudar sua vida.',
    content: 'A caminhada é o exercício mais natural...',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '15 Jul, 2024',
    readTime: '5 min',
    author: 'Lucas Ferreira'
  }
];
