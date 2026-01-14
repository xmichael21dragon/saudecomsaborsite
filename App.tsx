
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
  }, [currentView]);

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

  const renderContent = () => {
    if (isLoading && currentView === 'home') {
      return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
          <div className="w-16 h-16 border-4 border-[#df2a2a] border-t-transparent rounded-full animate-spin mb-4"></div>
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
          <div className="animate-fade-in bg-[#fafaf9]">
            <section className="relative h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000" 
                className="absolute inset-0 w-full h-full object-cover scale-110" 
                alt="Fundo de Receitas Saudáveis" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/40 to-[#fafaf9]"></div>
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
                   <div className="w-2 h-2 bg-[#df2a2a] rounded-full animate-ping"></div>
                   <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Gastronomia Funcional</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
                  Receitas <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-white">Saudáveis</span>
                </h1>
                <p className="text-white/80 font-medium mb-12 text-xl md:text-2xl italic max-w-2xl mx-auto leading-relaxed">
                  Equilíbrio perfeito entre o prazer de comer bem e o compromisso com sua longevidade.
                </p>
                <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="O que deseja preparar?" transparent />
              </div>
            </section>
            
            <div className="max-w-7xl mx-auto px-4 pb-32 -mt-10 relative z-20">
              
              {/* Receitas Mais Populares Section */}
              {!searchQuery && topRatedRecipes.length > 0 && (
                <section className="mb-24 animate-fade-in">
                  <div className="flex flex-col items-center mb-12">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="h-[2px] w-12 bg-yellow-500"></div>
                      <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.6em]">Receitas Mais Populares</h3>
                      <div className="h-[2px] w-12 bg-yellow-500"></div>
                    </div>
                    <p className="text-stone-300 text-[10px] font-black uppercase tracking-[0.2em]">As favoritas da comunidade</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topRatedRecipes.map((recipe, index) => (
                      <div 
                        key={recipe.id} 
                        onClick={() => handleRecipeClick(recipe)}
                        className="group bg-white rounded-[3rem] p-4 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex items-center gap-6"
                      >
                        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-[2rem] shadow-lg">
                          <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={recipe.title} />
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[10px] font-black text-stone-900 shadow-sm">
                            #{index + 1}
                          </div>
                        </div>
                        <div className="min-w-0 pr-4">
                          <div className="flex items-center gap-2 mb-2">
                             <div className="flex text-yellow-500 text-[10px]">
                               {Array.from({ length: 5 }).map((_, i) => (
                                 <i key={i} className={`fa-solid fa-star ${i >= Math.floor(recipe.rating || 0) ? 'opacity-20' : ''}`}></i>
                               ))}
                             </div>
                             <span className="text-[10px] font-black text-stone-400">({recipe.rating})</span>
                          </div>
                          <h4 className="text-xl font-bold text-stone-800 leading-tight group-hover:text-[#df2a2a] transition-colors truncate">{recipe.title}</h4>
                          <span className="text-[9px] font-black text-[#2e7d32] uppercase tracking-widest mt-2 block">{recipe.diet}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <AdBanner className="mb-20" />

              {subcategoryEntries.length > 0 ? subcategoryEntries.map(([subcategory, catRecipes], idx) => (
                <React.Fragment key={subcategory}>
                  <div className="mb-24">
                    <div className="flex items-center gap-6 mb-12">
                       <h2 className="text-sm font-black text-stone-400 uppercase tracking-[0.4em] whitespace-nowrap">{subcategory}</h2>
                       <div className="h-[1px] bg-stone-200 flex-grow"></div>
                       <span className="text-[10px] font-black text-stone-300 uppercase">{catRecipes.length} PRATOS</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                      {catRecipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => handleRecipeClick(r)} />)}
                    </div>
                  </div>
                  {idx === 0 && subcategoryEntries.length > 1 && <AdBanner className="mb-24" />}
                </React.Fragment>
              )) : (
                <div className="text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-stone-100 shadow-sm">
                  <p className="text-stone-300 text-2xl font-black uppercase tracking-widest">Nenhuma receita encontrada.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'saude':
        return (
          <div className="animate-fade-in bg-[#fafaf9]">
            <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
                className="absolute inset-0 w-full h-full object-cover scale-105" 
                alt="Bem-estar e Saúde" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/80 via-stone-900/30 to-transparent"></div>
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                <div className="inline-flex items-center gap-3 px-8 py-3 bg-emerald-600/20 backdrop-blur-xl rounded-full mb-8 border border-emerald-500/30">
                   <i className="fa-solid fa-notes-medical text-emerald-400"></i>
                   <span className="text-[10px] font-black text-emerald-100 uppercase tracking-[0.5em]">Ciência & Bem-estar</span>
                </div>
                <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter mb-8 leading-[0.8] drop-shadow-2xl">
                  Portal <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-stone-200">Saúde</span>
                </h1>
                <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="O que deseja saber sobre saúde?" transparent />
              </div>
            </section>
            <div className="max-w-7xl mx-auto px-4 pb-32 -mt-12 relative z-20">
              <AdBanner className="mb-20" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                {filteredArticles.length > 0 ? filteredArticles.map(a => (
                  <div key={a.id} onClick={() => handleArticleClick(a)} className="bg-white p-10 rounded-[3.5rem] border border-stone-100 flex flex-col md:flex-row gap-10 cursor-pointer hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full -mr-16 -mt-16"></div>
                    <div className="w-full md:w-56 h-56 flex-shrink-0 overflow-hidden rounded-[2.5rem] shadow-lg">
                      <img src={a.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={a.title} />
                    </div>
                    <div className="flex flex-col justify-center relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">{a.category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-100"></span>
                        <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{a.readTime}</span>
                      </div>
                      <h3 className="text-3xl font-black mb-6 group-hover:text-emerald-700 transition-colors leading-[1.1] tracking-tight text-stone-800">{a.title}</h3>
                      <p className="text-lg text-stone-400 line-clamp-2 leading-relaxed font-medium italic">"{a.excerpt}"</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-stone-100">
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
          <div className="space-y-12 md:space-y-24 pb-32 animate-fade-in">
            <section className="max-w-7xl mx-auto px-4 pt-16">
               <div className="relative rounded-[4rem] overflow-hidden bg-stone-900 text-white min-h-[600px] md:min-h-[750px] flex items-center px-10 md:px-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                  <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105" alt="Gourmet Food" />
                  <div className="relative z-10 w-full flex flex-col items-center text-center px-4">
                    <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-black mb-10 leading-[0.8] tracking-tighter text-white drop-shadow-2xl">A sua saúde <br/> começa no prato.</h2>
                    <p className="text-xl md:text-3xl text-stone-300 mb-16 font-medium italic max-w-3xl leading-relaxed">Inspiração culinária para uma vida longa e deliciosa.</p>
                    <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="O que vamos cozinhar hoje?" transparent />
                  </div>
               </div>
            </section>
            <AdBanner className="my-0" />
            <section className="pt-8">
              <div className="max-w-7xl mx-auto px-4 mb-10">
                <h3 className="text-sm font-black text-stone-400 uppercase tracking-[0.5em] mb-4">Destaques da Semana</h3>
                <div className="w-16 h-1.5 bg-[#df2a2a] rounded-full"></div>
              </div>
              <PostCarousel items={recentPosts} onItemClick={(item: any) => item.x_type === 'article' ? handleArticleClick(item) : handleRecipeClick(item)} />
            </section>
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
                      <span className={`text-xs font-black uppercase tracking-widest mb-3 block ${post.x_type === 'article' ? 'text-emerald-600' : 'text-[#df2a2a]'}`}>{post.category}</span>
                      <h4 className="text-3xl font-bold text-stone-800 leading-tight group-hover:text-[#df2a2a] transition-colors tracking-tight">{post.title}</h4>
                      <p className="mt-6 text-xs text-stone-400 font-black uppercase tracking-widest">{post.readTime || (post.prepTime ? post.prepTime + ' MINUTOS' : 'Leitura rápida')}</p>
                    </div>
                  </div>
                ))}
              </div>
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
