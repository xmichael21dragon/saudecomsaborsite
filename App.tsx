
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
      console.error("Erro ao carregar dados do Supabase:", error);
      setAllRecipes(MOCK_RECIPES);
      setAllArticles(MOCK_ARTICLES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const topRatedRecipes = useMemo(() => {
    return [...allRecipes]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  }, [allRecipes]);

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

  const renderContent = () => {
    if (isLoading && (currentView === 'home' || currentView === 'receitas' || currentView === 'saude')) {
      return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
          <div className="w-16 h-16 border-4 border-[#ef4444] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Aguarde um momento...</p>
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
        const subcategoryEntries: [string, Recipe[]][] = Object.entries(groupedRecipes);
        return (
          <div className="animate-fade-in bg-[#fafaf9]">
            <section className="relative h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000" 
                className="absolute inset-0 w-full h-full object-cover scale-110" 
                alt="Saúde com Sabor Banner" 
              />
              <div className="absolute inset-0 bg-stone-900/70"></div>
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                <div className="w-24 h-24 mb-6 bg-white rounded-[2rem] p-4 shadow-2xl animate-fade-in">
                  <Logo />
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
                  Saúde <span className="text-[#3b82f6]">com</span> <span className="text-[#ef4444]">Sabor</span>
                </h1>
                <p className="text-white/90 font-medium mb-12 text-xl italic max-w-2xl mx-auto leading-relaxed">
                  Culinária afetiva e nutrição de precisão para sua vida.
                </p>
                <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="O que vamos cozinhar hoje?" transparent />
              </div>
            </section>
            
            <div className="max-w-7xl mx-auto px-4 pb-32 -mt-10 relative z-20">
              {!searchQuery && topRatedRecipes.length > 0 && (
                <section className="mb-20 animate-fade-in">
                  <div className="flex flex-col items-center mb-10">
                    <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.5em] mb-4 text-center">Favoritos da Comunidade</h3>
                    <div className="h-1 w-20 bg-[#ef4444] rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topRatedRecipes.map((recipe) => (
                      <div key={recipe.id} onClick={() => handleRecipeClick(recipe)} className="group bg-white rounded-[2.5rem] p-4 border border-stone-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex items-center gap-5">
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl">
                          <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={recipe.title} />
                        </div>
                        <div className="min-w-0 pr-2">
                          <h4 className="text-lg font-bold text-stone-800 leading-tight group-hover:text-[#ef4444] transition-colors truncate">{recipe.title}</h4>
                          <span className="text-[10px] font-black text-[#3b82f6] uppercase tracking-widest mt-2 block">{recipe.diet}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              <AdBanner className="mb-20" />
              {subcategoryEntries.length > 0 ? subcategoryEntries.map(([subcategory, catRecipes], idx) => (
                <React.Fragment key={subcategory}>
                  <div className="mb-20">
                    <h2 className="text-sm font-black text-stone-400 uppercase tracking-[0.4em] mb-10 text-center">{subcategory}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {catRecipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => handleRecipeClick(r)} />)}
                    </div>
                  </div>
                  {idx === 0 && subcategoryEntries.length > 1 && <AdBanner className="mb-20" />}
                </React.Fragment>
              )) : (
                <div className="text-center py-40">
                  <p className="text-stone-300 text-xl font-black uppercase tracking-widest">Nenhuma receita encontrada.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'saude':
        return (
          <div className="animate-fade-in bg-[#fafaf9]">
            <section className="bg-stone-900 pt-32 pb-20 text-center px-4">
              <div className="w-16 h-16 mb-6 bg-white rounded-2xl p-3 shadow-2xl mx-auto">
                <Logo />
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">Guias de <span className="text-emerald-500">Saúde</span></h1>
              <p className="text-stone-400 text-xl italic max-w-2xl mx-auto">Informação baseada em evidência para sua longevidade.</p>
            </section>
            <div className="max-w-7xl mx-auto px-4 pb-32 py-20">
              <AdBanner className="mb-20" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                {filteredArticles.length > 0 ? filteredArticles.map(a => (
                  <div key={a.id} onClick={() => handleArticleClick(a)} className="bg-white p-8 rounded-[3rem] border border-stone-100 flex flex-col md:flex-row gap-8 cursor-pointer hover:shadow-2xl transition-all group">
                    <div className="w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-2xl">
                      <img src={a.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={a.title} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-3">{a.category}</span>
                      <h3 className="text-2xl font-black mb-4 group-hover:text-emerald-700 transition-colors leading-tight text-stone-800">{a.title}</h3>
                      <p className="text-stone-500 line-clamp-2 leading-relaxed italic">{a.excerpt}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-40">
                    <p className="text-stone-300 text-xl font-black uppercase tracking-widest">Nenhum artigo encontrado.</p>
                  </div>
                )}
              </div>
              <AdBanner />
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-20 pb-32 animate-fade-in">
            <section className="max-w-7xl mx-auto px-4 pt-16">
               <div className="relative rounded-[3.5rem] overflow-hidden bg-stone-900 text-white min-h-[500px] flex items-center px-10 md:px-20 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Gourmet" />
                  <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-8 bg-white/10 backdrop-blur rounded-3xl p-4 border border-white/20 shadow-2xl">
                      <Logo />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
                      Saúde <span className="text-[#3b82f6]">com</span> <span className="text-[#ef4444]">Sabor</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-stone-300 mb-12 font-medium italic max-w-2xl">Transformamos ingredientes em energia e longevidade.</p>
                    <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Busque por receitas ou guias..." transparent />
                  </div>
               </div>
            </section>
            <AdBanner className="my-0" />
            <section>
              <div className="max-w-7xl mx-auto px-4 mb-10 flex items-center justify-between">
                <h3 className="text-sm font-black text-stone-400 uppercase tracking-[0.4em]">Em Destaque</h3>
                <div className="h-[1px] bg-stone-100 flex-grow mx-8"></div>
              </div>
              <PostCarousel items={recentPosts} onItemClick={(item: any) => item.x_type === 'article' ? handleArticleClick(item) : handleRecipeClick(item)} />
            </section>
            <section className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
                {recentPosts.map((post: any) => (
                  <div key={post.id} onClick={() => post.x_type === 'article' ? handleArticleClick(post) : handleRecipeClick(post)} className="group cursor-pointer">
                    <div className="relative h-64 overflow-hidden rounded-3xl mb-6 shadow-md">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-stone-900 shadow-sm">
                        {post.category}
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-stone-800 leading-tight group-hover:text-[#ef4444] transition-colors">{post.title}</h4>
                    <p className="mt-4 text-[10px] text-stone-400 font-black uppercase tracking-widest">{post.readTime || 'Nutrição Profissional'}</p>
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
      <CookieBanner onViewPrivacy={() => setCurrentView('privacidade')} />
    </div>
  );
};

export default App;
