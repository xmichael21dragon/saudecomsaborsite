
import { Recipe, Difficulty, DietType, Article } from './types';

// CONFIGURAÇÃO WORDPRESS
// No Vercel, você adicionará uma Environment Variable chamada REACT_APP_WP_URL
export const WP_CONFIG = {
  baseUrl: (typeof process !== 'undefined' && process.env.API_KEY) 
    ? 'https://seu-site-real.com/wp-json/wp/v2' 
    : 'https://seu-site-wordpress.com/wp-json/wp/v2',
  useExternalAPI: false, // Mude para true para ativar a busca real
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Sopa de Abóbora Detox',
    description: 'Uma sopa cremosa, rica em vitaminas e perfeita para dias frios. Ajuda na digestão e desintoxicação.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    diet: DietType.VEGAN,
    category: 'Nutrição',
    ingredients: ['500g de abóbora cabotiá', '1 cebola', '2 dentes de alho', '1 colher de gengibre', '1L de caldo de legumes'],
    instructions: ['Refogue o alho e cebola', 'Cozinhe a abóbora no caldo', 'Bata no liquidificador'],
    nutrition: { calories: 120, protein: 2, carbs: 18, fat: 4, fiber: 5 },
    rating: 4.8,
    reviews: [{ id: 'r1', user: 'Maria', rating: 5, comment: 'Deliciosa!', date: '2023-10-15' }],
    author: 'Nutri Saúde'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: '10 Alimentos que Aumentam a Imunidade',
    excerpt: 'Descubra como fortalecer seu sistema imunológico através da alimentação correta.',
    content: 'A imunidade é nossa principal barreira...',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    category: 'Nutrição',
    date: '20 Mai, 2024',
    readTime: '5 min',
    author: 'Dr. Alimento'
  }
];

export const CATEGORIES = ['Saúde Geral', 'Nutrição', 'Receitas Saudáveis', 'Bem-estar', 'Saúde Mental'];
