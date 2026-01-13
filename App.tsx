
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
import { supabase } from './lib/supabase';

type View = 'home' | 'recipe' | 'planner' | 'imc' | 'receitas' | 'sobre' | 'conversor' | 'saude' | 'article' | 'editor' | 'termos' | 'privacidade';

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

      // Se o banco estiver vazio, usa os mocks como fallback inicial
      const recipesData = (recipesRes.data && recipesRes.data.length > 0) ? recipesRes.data : MOCK_RECIPES;
      const articlesData = (articlesRes.data && articlesRes.data.length > 0) ? articlesRes.data : MOCK_ARTICLES;

      setAllRecipes(recipesData as Recipe[]);
      setAllArticles(articlesData as Article[]);
    } catch (error) {
      console.error("Erro ao carregar dados do Supabase:", error);
      setAllRecipes(MOCK_RECIPES);
      setAllArticles(MOCK_ARTICLES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentView]); // Recarrega ao mudar de página para garantir dados frescos

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allRecipes]);

  const groupedRecipes = useMemo<Record<string, Recipe[]>>(() => {
    return filteredRecipes.reduce((acc, recipe) => {
      const key = recipe.subcategory || 'Diversos';
      if (!acc[key]) acc[key] = [];
      acc[key].push(recipe);
      return acc;
    }, {} as Record<string, Recipe[]>);
  }, [filteredRecipes]);

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
    ];
    // @ts-ignore
    return combined.slice(0, 6);
  }, [allRecipes, allArticles]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const SearchInput = ({ placeholder }: { placeholder: string }) => (
    <div className="relative w-full max-w-2xl group">
      <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 text-xl group-focus-within:text-red-500 transition-colors"></i>
      <input 
        type="text" 
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-white border-2 border-stone-100 focus:border-red-500/20 rounded-[2rem] py-6 pl-16 pr-8 text-xl text-stone-800 font-bold shadow-sm outline-none transition-all placeholder:text-stone-300"
      />
    </div>
  );

  const renderContent = () => {
    if (isLoading && currentView === 'home') {
      return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Carregando Sabores...</p>
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
      case 'editor': return <ContentEditor onBack={() => setCurrentView('home')} />;
      case 'termos': return <TermsOfUse onBack={() => setCurrentView('home')} />;
      case 'privacidade': return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
      case 'receitas':
        const subcategoryEntries: [string, Recipe[]][] = Object.entries(groupedRecipes);
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-black text-stone-800 tracking-tighter mb-6 leading-none">Receitas Saudáveis</h1>
              <p className="text-stone-500 font-medium mb-12 text-2xl italic">Equilíbrio e sabor em cada prato.</p>
              <div className="flex justify-center">
                <SearchInput placeholder="Ex: Massa, Fitness, Detox..." />
              </div>
            </div>
            <AdBanner className="mb-20" />
            {subcategoryEntries.length > 0 ? subcategoryEntries.map(([subcategory, catRecipes], idx) => (
              <React.Fragment key={subcategory}>
                <div className="mb-20">
                  <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.4em] mb-10 border-b border-stone-100 pb-6">{subcategory}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {catRecipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => handleRecipeClick(r)} />)}
                  </div>
                </div>
                {idx === 0 && subcategoryEntries.length > 1 && <AdBanner className="mb-20" />}
              </React.Fragment>
            )) : (
              <div className="text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-stone-100">
                <i className="fa-solid fa-utensils text-7xl text-stone-100 mb-8"></i>
                <p className="text-stone-400 text-2xl font-bold">Nenhuma receita encontrada.</p>
              </div>
            )}
          </div>
        );
      case 'saude':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
              <div>
                <h1 className="text-6xl font-black text-stone-800 tracking-tighter mb-4 leading-none">Saúde</h1>
                <p className="text-stone-500 text-2xl font-medium">Artigos revisados para o seu bem-estar.</p>
              </div>
              <SearchInput placeholder="Pesquisar artigos..." />
            </div>
            <AdBanner className="mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              {filteredArticles.map(a => (
                <div key={a.id} onClick={() => handleArticleClick(a)} className="bg-white p-10 rounded-[3rem] border border-stone-100 flex gap-8 cursor-pointer hover:shadow-2xl transition-all group">
                  <img src={a.image} className="w-48 h-48 rounded-[2rem] object-cover shadow-md" alt={a.title} />
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3">{a.category}</span>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors leading-tight">{a.title}</h3>
                    <p className="text-lg text-stone-500 line-clamp-2 leading-relaxed">{a.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-12 md:space-y-24 pb-32 animate-fade-in">
            <section className="max-w-7xl mx-auto px-4 pt-16">
               <div className="relative rounded-[4rem] overflow-hidden bg-stone-900 text-white min-h-[600px] md:min-h-[750px] flex items-center px-10 md:px-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                  <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105" alt="Gourmet Food" />
                  <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-10 leading-[0.9] tracking-tighter text-white drop-shadow-2xl">A sua saúde começa no prato.</h2>
                    <p className="text-xl md:text-3xl text-stone-300 mb-16 font-medium italic max-w-3xl px-6 leading-relaxed">Inspiração culinária para uma vida longa e deliciosa.</p>
                    <SearchInput placeholder="O que vamos cozinhar hoje?" />
                  </div>
               </div>
            </section>
            <AdBanner className="my-0" />
            <section className="pt-8">
              <div className="max-w-7xl mx-auto px-4 mb-10">
                <h3 className="text-sm font-black text-stone-400 uppercase tracking-[0.5em] mb-4">Destaques da Semana</h3>
                <div className="w-16 h-1.5 bg-red-600 rounded-full"></div>
              </div>
              <PostCarousel 
                items={recentPosts} 
                onItemClick={(item: any) => item.x_type === 'article' ? handleArticleClick(item) : handleRecipeClick(item)} 
              />
            </section>
            <AdBanner />
            <section className="max-w-7xl mx-auto px-4 pt-12">
              <div className="mb-16">
                <h3 className="text-sm font-black text-stone-400 uppercase tracking-[0.5em] mb-4">Últimas Publicações</h3>
                <div className="w-16 h-1.5 bg-stone-200 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
                {recentPosts.map((post: any) => (
                  <div key={post.id} onClick={() => post.x_type === 'article' ? handleArticleClick(post) : handleRecipeClick(post)} className="minimal-card group cursor-pointer">
                    <div className="relative h-80 overflow-hidden rounded-[2.5rem] mb-8 shadow-md">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={post.title} />
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-xl shadow-sm">
                        <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest">{post.subcategory || post.category}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs font-black uppercase tracking-widest mb-3 block ${post.x_type === 'article' ? 'text-emerald-600' : 'text-red-600'}`}>{post.category}</span>
                      <h4 className="text-3xl font-bold text-stone-800 leading-tight group-hover:text-red-600 transition-colors tracking-tight">{post.title}</h4>
                      <p className="mt-6 text-xs text-stone-400 font-black uppercase tracking-widest">{post.readTime || (post.prepTime ? post.prepTime + ' MINUTOS' : 'Leitura rápida')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <AdBanner />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onEditorClick={() => setCurrentView('editor')} onTermsClick={() => setCurrentView('termos')} onViewChange={setCurrentView} />
    </div>
  );
};

export default App;
