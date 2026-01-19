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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

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

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allRecipes]);

  const recentPosts = useMemo(() => {
    return [
      ...allRecipes.map(r => ({ ...r, x_type: 'recipe' })),
      ...allArticles.map(a => ({ ...a, x_type: 'article' }))
    ].slice(0, 6);
  }, [allRecipes, allArticles]);

  const renderContent = () => {
    if (isLoading && (currentView === 'home' || currentView === 'receitas' || currentView === 'saude')) {
      return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
          <div className="w-16 h-16 border-4 border-[#ef4444] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Carregando Sabores...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'recipe': return selectedRecipe ? <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentView('receitas')} /> : null;
      case 'article': return selectedArticle ? <ArticleDetail article={selectedArticle} onBack={() => setCurrentView('saude')} /> : null;
      case 'planner': return <MealPlanner recipes={allRecipes} onRecipeClick={(r) => { setSelectedRecipe(r); setCurrentView('recipe'); }} />;
      case 'imc': return <BMICalculator />;
      case 'conversor': return <WeightConverter />;
      case 'sobre': return <SobreNos />;
      case 'contate': return <Contact onBack={() => setCurrentView('home')} />;
      case 'editor': return <ContentEditor onBack={() => setCurrentView('home')} />;
      case 'termos': return <TermsOfUse onBack={() => setCurrentView('home')} />;
      case 'privacidade': return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
      case 'receitas':
        return (
          <div className="animate-slide-up">
            <section className="bg-stone-900 py-32 text-center text-white">
              <h1 className="text-6xl font-black mb-6">Biblioteca de Receitas</h1>
              <p className="text-stone-400 max-w-xl mx-auto mb-12">Filtre por dieta, ingrediente ou nível de dificuldade.</p>
              <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="O que vamos cozinhar hoje?" transparent />
            </section>
            <div className="max-w-7xl mx-auto px-4 py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredRecipes.map(r => (
                  <RecipeCard key={r.id} recipe={r} onClick={() => { setSelectedRecipe(r); setCurrentView('recipe'); }} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-20 pb-32">
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900">
               <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Banner" />
               <div className="relative z-10 text-center px-4 max-w-4xl">
                  <div className="w-20 h-20 bg-white rounded-3xl p-4 mx-auto mb-10 shadow-2xl">
                    <Logo />
                  </div>
                  <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none">
                    Saúde <span className="text-[#3b82f6]">com</span> <span className="text-[#ef4444]">Sabor</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-stone-200 mb-12 font-medium italic">Alta gastronomia e nutrição para uma vida longa e vibrante.</p>
                  <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Busque receitas ou guias de saúde..." transparent />
               </div>
            </section>
            <AdBanner />
            <section className="max-w-7xl mx-auto px-4">
              <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.4em] mb-10">Destaques Recentes</h3>
              <PostCarousel items={recentPosts} onItemClick={(item: any) => item.x_type === 'article' ? (setSelectedArticle(item), setCurrentView('article')) : (setSelectedRecipe(item), setCurrentView('recipe'))} />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <Header currentView={currentView} setView={setCurrentView} />
      <main>{renderContent()}</main>
      <Footer onEditorClick={() => setCurrentView('editor')} onTermsClick={() => setCurrentView('termos')} onViewChange={setCurrentView} />
      <CookieBanner onViewPrivacy={() => setCurrentView('privacidade')} />
    </div>
  );
};

export default App;