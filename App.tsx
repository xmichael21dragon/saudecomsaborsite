
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_RECIPES, MOCK_ARTICLES, WP_CONFIG } from './constants';
import { Recipe, DietType, Difficulty, Article } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import MealPlanner from './components/MealPlanner';
import BMICalculator from './components/BMICalculator';
import PostCarousel from './components/PostCarousel';
import SobreNos from './components/SobreNos';
import WordPressBridge from './components/WordPressBridge';

type View = 'home' | 'recipe' | 'planner' | 'saude' | 'receitas' | 'sobre' | 'wordpress';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wpRecipes, setWpRecipes] = useState<Recipe[]>([]);
  const [wpArticles, setWpArticles] = useState<Article[]>([]);

  // Função para buscar dados do WordPress
  const fetchWordPressData = async () => {
    if (!WP_CONFIG.useExternalAPI) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${WP_CONFIG.baseUrl}/posts?_embed&per_page=20`);
      const data = await response.json();
      
      // Aqui faríamos o mapeamento real se a API estivesse ativa
      // Por enquanto, simulamos o sucesso após 1.5s
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Dados do WordPress carregados com sucesso');
    } catch (error) {
      console.error('Erro ao conectar com WordPress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWordPressData();
  }, []);

  // Combinar dados Reais + Mocks (priorizando reais no futuro)
  const allRecipes = useMemo(() => [...wpRecipes, ...MOCK_RECIPES], [wpRecipes]);
  const allArticles = useMemo(() => [...wpArticles, ...MOCK_ARTICLES], [wpArticles]);

  const latestPosts = useMemo(() => {
    const combined = [...allRecipes, ...allArticles];
    return combined.slice(0, 7);
  }, [allRecipes, allArticles]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allRecipes]);

  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allArticles]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
    window.scrollTo(0, 0);
  };

  const handleCarouselClick = (item: any) => {
    if ('ingredients' in item) handleRecipeClick(item);
    else {
      setCurrentView('saude');
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-[#2e7d32] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-stone-400 font-bold animate-pulse tracking-widest uppercase text-xs">Conectando ao WordPress...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'recipe':
        return selectedRecipe ? <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentView('receitas')} /> : null;
      case 'receitas':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleRecipeClick(recipe)} />
              ))}
            </div>
          </div>
        );
      case 'saude':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <div key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 transition-all hover:shadow-xl cursor-pointer">
                  <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-green-600 uppercase mb-2 block">{article.category}</span>
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <button className="text-[#2e7d32] font-black text-xs uppercase tracking-tighter hover:underline">Ler completo →</button>
                  </div>
                </div>
              ))}
            </div>
            <BMICalculator />
          </div>
        );
      case 'wordpress':
        return <WordPressBridge />;
      case 'sobre':
        return <SobreNos />;
      case 'home':
      default:
        return (
          <div className="space-y-16 py-12">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="relative rounded-[3rem] overflow-hidden bg-stone-900 text-white h-[550px] flex items-center px-6 lg:px-12 mb-16 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Banner" />
                  <div className="relative max-w-3xl w-full">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display' }}>
                      Cozinha Real para <br/> Vidas Reais.
                    </h2>
                    <p className="text-lg lg:text-xl text-stone-200 mb-10 leading-relaxed max-w-xl">
                      Acompanhe as novidades sincronizadas diretamente do seu blog WordPress. Nutrição com inteligência.
                    </p>
                    
                    <div className="relative max-w-2xl mb-12">
                       <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-[#2e7d32]">
                         <i className="fa-solid fa-magnifying-glass text-xl"></i>
                       </div>
                       <input 
                         type="text"
                         placeholder="O que você deseja buscar?"
                         className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-white text-stone-900 text-lg shadow-2xl focus:ring-4 focus:ring-[#2e7d32]/30 transition-all outline-none"
                         value={searchQuery}
                         onChange={(e) => {
                           setSearchQuery(e.target.value);
                           if (e.target.value.length > 0) setCurrentView('receitas');
                         }}
                       />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setCurrentView('receitas')} className="bg-[#df2a2a] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#c02424] transition-all shadow-lg shadow-red-900/40">Ver Receitas</button>
                      <button onClick={() => setCurrentView('wordpress')} className="bg-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40">Integrar WordPress</button>
                    </div>
                  </div>
               </div>
            </section>

            <section>
              <PostCarousel items={latestPosts} onItemClick={handleCarouselClick} />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <div className="flex-grow">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
