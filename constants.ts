import { Recipe, Difficulty, DietType, Article } from './types';

export const WP_CONFIG = {
  baseUrl: 'https://seu-site-wordpress.com/wp-json/wp/v2',
  useExternalAPI: false,
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Bowl de Frutas Vermelhas e Chia Antiox',
    description: 'Um café da manhã vibrante, rico em antioxidantes e fibras para começar o dia com energia máxima.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Café da Manhã',
    ingredients: ['200g de morangos congelados', '1 banana madura', '1 colher de sopa de chia', '100ml de leite de coco'],
    instructions: [
      'Bata as frutas e o leite no liquidificador até obter uma textura de sorvete.',
      'Transfira para um bowl e misture as sementes de chia.',
      'Finalize com frutas frescas por cima e sirva imediatamente.'
    ],
    nutrition: { calories: 280, protein: 5, carbs: 42, fat: 7, fiber: 12 },
    rating: 4.9,
    reviews: [],
    author: 'Nutri Chef'
  },
  {
    id: '2',
    title: 'Salmão Grelhado em Crosta de Amêndoas',
    description: 'Proteína nobre combinada com a crocância das amêndoas, perfeita para uma refeição low carb sofisticada.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    diet: DietType.LOW_CARB,
    category: 'Receitas',
    subcategory: 'Pratos Principais',
    ingredients: ['2 filés de salmão fresco', '50g de amêndoas laminadas', 'Limão siciliano', 'Azeite extra virgem'],
    instructions: [
      'Tempere o salmão com limão e sal.',
      'Pressione as amêndoas sobre o topo do filé.',
      'Grelhe em fogo médio até o ponto desejado, mantendo a crosta crocante.'
    ],
    nutrition: { calories: 350, protein: 34, carbs: 4, fat: 22, fiber: 3 },
    rating: 5.0,
    reviews: [],
    author: 'Chef Saudável'
  },
  {
    id: '3',
    title: 'Suco Verde Energizante Detox',
    description: 'O clássico revigorante para limpar o organismo e aumentar a disposição matinal.',
    image: 'https://images.unsplash.com/photo-1610970882799-64a3e1d20928?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Bebidas e Sucos',
    ingredients: ['2 folhas de couve manteiga', '1 maçã verde', '2cm de gengibre fresco', 'Suco de meio limão'],
    instructions: [
      'Lave bem todos os ingredientes.',
      'Bata tudo no liquidificador com 200ml de água de coco.',
      'Beba sem coar para aproveitar todas as fibras.'
    ],
    nutrition: { calories: 80, protein: 2, carbs: 18, fat: 0, fiber: 4 },
    rating: 4.8,
    reviews: [],
    author: 'Nutri Chef'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Higiene do Sono: O Pilar Oculto da Longevidade',
    excerpt: 'Descubra como a qualidade do seu descanso impacta diretamente seu metabolismo e clareza mental.',
    content: 'O sono reparador é fundamental para a regeneração celular...',
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '10 Jan, 2025',
    readTime: '8 min',
    author: 'Dra. Maria Sono'
  },
  {
    id: 'a2',
    title: 'Os Benefícios Científicos da Caminhada Diária',
    excerpt: 'Um guia completo sobre como 30 minutos de movimento podem transformar sua saúde cardiovascular.',
    content: 'A caminhada é o exercício mais natural e acessível...',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '15 Jan, 2025',
    readTime: '5 min',
    author: 'Dr. Lucas Ferreira'
  }
];