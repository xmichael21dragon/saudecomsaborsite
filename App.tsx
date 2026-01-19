import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_RECIPES, MOCK_ARTICLES } from './constants';
import { Recipe, Article } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import ArticleDetail from './components/ArticleDetail';
import MealPlanner from './components/MealPlanner';
import BMICalculator from './components/BMICalculator';
import WeightConverter from './components/WeightConverter';
import PostCarousel from './components/PostCarousel';
import SobreNos from './components/SobreNos';
import ContentEditor from './components/ContentEditor';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import AdBanner from './components/AdBanner';
import SearchInput from './components/SearchInput'; 
import Logo from './components/Logo';
import Contact from './components/Contact';
import CookieBanner from './components/CookieBanner';
import { supabase } from './lib/supabase';

type View = 'home' | 'recipe' | 'planner' | 'imc' | 'receitas' | 'sobre' | 'conversor' | 'saude' | 'article' | 'editor' | 'termos' | 'privacidade' | 'contato';

const ITEMS_PER_PAGE_RECIPES = 8;
const ITEMS_PER_PAGE_ARTICLES = 6;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  const [visibleRecipesLimit, setVisibleRecipesLimit] = useState(ITEMS_PER_PAGE_RECIPES);
  const [visibleArticlesLimit, setVisibleArticlesLimit] = useState(ITEMS_PER_PAGE_ARTICLES);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [recipesRes, articlesRes] = await Promise.all([
        supabase.from('recipes').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false })
      ]);

      const recipesData = (recipesRes.data && recipesRes.data.length > 0) ? recipesRes.data : MOCK_RECIPES;
      const articlesData = (articlesRes.data && articlesRes.data.length > 0) ? articlesRes.data : MOCK_ARTICLES;

      setAllRecipes(recipesData as Recipe[]);
      setAllArticles(articlesData as Article[]);
    } catch (error) {
      setAllRecipes(MOCK_RECIPES);
      setAllArticles(MOCK_ARTICLES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentView === 'receitas') setVisibleRecipesLimit(ITEMS_PER_PAGE_RECIPES);
    if (currentView === 'saude') setVisibleArticlesLimit(ITEMS_PER_PAGE_ARTICLES);
  }, [currentView]);

  useEffect(() => {
    setVisibleRecipesLimit(ITEMS_PER_PAGE_RECIPES);
    setVisibleArticlesLimit(ITEMS_PER_PAGE_ARTICLES);
  }, [searchQuery]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allRecipes]);

  const filteredArticles = useMemo(() => {
    return allArticles.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allArticles]);

  const recentPosts = useMemo(() => {
    const combined = [
      ...allRecipes.map(r => ({ ...r, x_type: 'recipe' })),
      ...allArticles.map(a => ({ ...a, x_type: 'article' }))
    ].sort((a, b) => {
      // Ordenação simples por ID decrescente ou data se disponível
      return (b.id > a.id) ? 1 : -1;
    });
    return combined.slice(0, 9); // Agora pegamos 9 posts para a Home
  }, [allRecipes, allArticles]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const renderContent = () => {
    if (isLoading && (currentView === 'home' || currentView === 'receitas' || currentView === 'saude')) {
      return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
          <div className="w-16 h-16 border-4 border-[#ef4444] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-400 font-black uppercase tracking-widest text-xs">Carregando Sabores...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'recipe': return selectedRecipe ? <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentView('receitas')} /> : null;
      case 'article': return selectedArticle ? <ArticleDetail article={selectedArticle} onBack={() => setCurrentView('saude')} /> : null;
      case 'planner': return <MealPlanner recipes={allRecipes} onRecipeClick={handleRecipeClick} />;
      case 'imc': return <BMICalculator />;
      case 'conversor': return <WeightConverter />;
      case 'sobre': return <SobreNos />;
      case 'contato': return <Contact onBack={() => setCurrentView('home')} />;
      case 'editor': return <ContentEditor onBack={() => setCurrentView('home')} />;
      case 'termos': return <TermsOfUse onBack={() => setCurrentView('home')} />;
      case 'privacidade': return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
      case 'receitas':
        const paginatedRecipes = filteredRecipes.slice(0, visibleRecipesLimit);
        const hasMoreRecipes = visibleRecipesLimit < filteredRecipes.length;
        return (
          <div className="animate-fade-in">
            <section className="relative h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden bg-stone-900">
               <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Banner" />
               <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
                  <div className="w-20 h-20 bg-white rounded-3xl p-4 mb-8 shadow-2xl"><Logo /></div>
                  <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase">Explorar <span className="text-[#ef4444]">Receitas</span></h1>
                  <p className="text-stone-300 text-xl font-medium italic mb-10">Sabores autênticos com o equilíbrio nutricional que você merece.</p>
                  <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Busque por ingredientes ou dieta..." transparent />
               </div>
            </section>
            <div className="max-w-7xl mx-auto px-4 py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {paginatedRecipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => handleRecipeClick(r)} />)}
              </div>
              {hasMoreRecipes && (
                <div className="mt-16 flex justify-center">
                  <button onClick={() => setVisibleRecipesLimit(p => p + ITEMS_PER_PAGE_RECIPES)} className="px-10 py-5 bg-stone-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl">Carregar Mais</button>
                </div>
              )}
            </div>
          </div>
        );
      case 'saude':
        const paginatedArticles = filteredArticles.slice(0, visibleArticlesLimit);
        const hasMoreArticles = visibleArticlesLimit < filteredArticles.length;
        return (
          <div className="animate-fade-in">
            <section className="bg-stone-900 pt-32 pb-20 text-center text-white px-4">
               <div className="w-16 h-16 bg-white rounded-2xl p-3 mb-6 mx-auto"><Logo /></div>
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase">Guias de <span className="text-[#3b82f6]">Saúde</span></h1>
               <p className="text-stone-400 text-xl italic font-medium">Ciência, nutrição e bem-estar para uma vida longa.</p>
            </section>
            <div className="max-w-7xl mx-auto px-4 py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {paginatedArticles.map(a => (
                  <div key={a.id} onClick={() => handleArticleClick(a)} className="bg-white p-8 rounded-[3rem] border border-stone-100 flex flex-col md:flex-row gap-8 cursor-pointer hover:shadow-2xl transition-all group">
                    <img src={a.image} className="w-full md:w-48 h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform" />
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-black text-[#3b82f6] uppercase tracking-[0.3em] mb-2">{a.category}</span>
                      <h3 className="text-2xl font-black mb-4 group-hover:text-[#3b82f6] transition-colors">{a.title}</h3>
                      <p className="text-stone-500 line-clamp-2 italic leading-relaxed">{a.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
              {hasMoreArticles && (
                <div className="mt-16 flex justify-center">
                  <button onClick={() => setVisibleArticlesLimit(p => p + ITEMS_PER_PAGE_ARTICLES)} className="px-10 py-5 bg-[#3b82f6] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl">Carregar Mais Guias</button>
                </div>
              )}
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-20 pb-32 animate-fade-in">
            <section className="max-w-7xl mx-auto px-4 pt-16">
               <div className="relative rounded-[3.5rem] overflow-hidden bg-stone-900 text-white min-h-[550px] flex items-center px-10 md:px-20 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Gourmet" />
                  <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-8 bg-white/10 backdrop-blur rounded-3xl p-4 border border-white/20 shadow-2xl"><Logo /></div>
                    <h2 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tighter uppercase">
                      SAÚDE <span className="text-[#3b82f6]">COM</span> <span className="text-[#ef4444]">SABOR</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-stone-300 mb-12 font-medium italic max-w-2xl">Sua fonte definitiva de gastronomia funcional e bem-estar.</p>
                    <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Busque por receitas ou guias de saúde..." transparent />
                  </div>
               </div>
            </section>
            <AdBanner className="my-0" />
            
            {/* Posts em Carrossel (Destaques) */}
            <section>
              <div className="max-w-7xl mx-auto px-4 mb-10 flex items-center justify-between">
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em]">Destaques Principais</h3>
                <div className="h-[1px] bg-stone-100 flex-grow mx-8"></div>
              </div>
              <PostCarousel items={recentPosts.slice(0, 5)} onItemClick={(item: any) => item.x_type === 'article' ? handleArticleClick(item) : handleRecipeClick(item)} />
            </section>

            {/* MURAL DE NOVIDADES - 9 POSTS */}
            <section className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col items-center mb-16">
                <h3 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter mb-4 uppercase">Novidades da <span className="text-[#ef4444]">Semana</span></h3>
                <p className="text-stone-400 font-bold italic text-xl">As últimas criações e descobertas do nosso portal.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {recentPosts.map((post: any) => (
                  <div 
                    key={post.id} 
                    onClick={() => post.x_type === 'article' ? handleArticleClick(post) : handleRecipeClick(post)} 
                    className="group cursor-pointer bg-white rounded-[3rem] border border-stone-50 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={post.title} />
                      <div className="absolute top-6 left-6">
                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md ${post.x_type === 'article' ? 'bg-blue-600/90 text-white' : 'bg-red-600/90 text-white'}`}>
                          {post.x_type === 'article' ? 'Guia de Saúde' : (post.diet || 'Receita')}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                         <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Postado recentemente</span>
                      </div>
                      <h4 className="text-2xl font-black text-stone-800 leading-tight group-hover:text-[#ef4444] transition-colors mb-4 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{post.author}</span>
                        <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 group-hover:bg-red-50 group-hover:text-red-500 transition-all">
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 text-center">
                 <button 
                  onClick={() => setCurrentView('receitas')}
                  className="px-12 py-5 bg-stone-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl hover:scale-105"
                 >
                   Ver todo o acervo
                 </button>
              </div>
            </section>

            <AdBanner />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onEditorClick={() => setCurrentView('editor')} onTermsClick={() => setCurrentView('termos')} onViewChange={setCurrentView} />
      <CookieBanner onViewPrivacy={() => setCurrentView('privacidade')} />
    </div>
  );
};

export default App;