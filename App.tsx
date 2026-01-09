
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
import WordPressBridge from './components/WordPressBridge';

type View = 'home' | 'recipe' | 'planner' | 'imc' | 'receitas' | 'sobre' | 'wordpress' | 'conversor' | 'saude' | 'article';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allRecipes = MOCK_RECIPES;
  const allArticles = MOCK_ARTICLES;

  // Gerenciamento Dinâmico de SEO
  useEffect(() => {
    let title = "Saúde com Sabor - Nutrição e Bem-estar";
    let description = "Aprenda receitas saudáveis e dicas de bem-estar.";

    switch (currentView) {
      case 'home':
        title = "Saúde com Sabor | Receitas Saudáveis e Bem-estar";
        break;
      case 'recipe':
        if (selectedRecipe) {
          title = `${selectedRecipe.title} | Saúde com Sabor`;
          description = selectedRecipe.description.substring(0, 160);
        }
        break;
      case 'article':
        if (selectedArticle) {
          title = `${selectedArticle.title} | Saúde com Sabor`;
          description = selectedArticle.excerpt;
        }
        break;
      case 'planner':
        title = "Planejador de Refeições Semanal | Saúde com Sabor";
        description = "Organize seu cardápio semanal de forma nutritiva e prática.";
        break;
      case 'imc':
        title = "Calculadora de IMC Interativa | Saúde com Sabor";
        description = "Descubra seu peso ideal e receba recomendações personalizadas.";
        break;
      case 'receitas':
        title = "Receitas Saudáveis e Nutritivas | Saúde com Sabor";
        description = "Explore centenas de receitas fitness, low carb, veganas e sem glúten.";
        break;
      case 'saude':
        title = "Blog de Saúde, Mente e Longevidade | Saúde com Sabor";
        description = "Artigos científicos simplificados sobre nutrição, sono e saúde mental.";
        break;
      case 'conversor':
        title = "Conversor de Medidas Culinárias | Saúde com Sabor";
        description = "Converta xícaras em gramas com precisão para suas receitas.";
        break;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [currentView, selectedRecipe, selectedArticle]);

  const latestPosts = useMemo(() => {
    const combined = [...allRecipes, ...allArticles];
    return combined.sort(() => 0.5 - Math.random()).slice(0, 7);
  }, [allRecipes, allArticles]);

  const recentPosts = useMemo(() => {
    // Simulando posts recentes pegando os primeiros de cada lista
    const mixed = [...allRecipes.slice(0, 3), ...allArticles.slice(0, 3)];
    return mixed.sort(() => 0.5 - Math.random());
  }, [allRecipes, allArticles]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allRecipes]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'recipe':
        return selectedRecipe ? <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentView('receitas')} /> : null;
      case 'article':
        return selectedArticle ? <ArticleDetail article={selectedArticle} onBack={() => setCurrentView('saude')} /> : null;
      case 'planner':
        return <MealPlanner recipes={allRecipes} onRecipeClick={handleRecipeClick} />;
      case 'receitas':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-stone-800 mb-4 tracking-tighter">Receitas Saudáveis</h1>
              <p className="text-stone-500 text-lg max-w-2xl">A culinária consciente une nutrição e prazer. Descubra sabores que transformam sua saúde.</p>
            </header>
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
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-stone-800 mb-4 tracking-tighter">Guia de Bem-estar</h1>
              <p className="text-stone-500 text-lg max-w-2xl font-medium leading-relaxed">Artigos profundos sobre nutrição, sono e saúde mental para uma vida plena.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allArticles.map(article => (
                <div key={article.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row group cursor-pointer" onClick={() => handleArticleClick(article)}>
                  <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 sm:w-2/3 flex flex-col justify-center">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 block">{article.category}</span>
                    <h2 className="text-xl font-bold text-stone-800 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">{article.title}</h2>
                    <p className="text-sm text-stone-500 mb-6 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-stone-400 font-bold">{article.date} • {article.readTime}</span>
                      <span className="text-emerald-600 font-bold text-sm flex items-center gap-1">Ler artigo <i className="fa-solid fa-arrow-right text-[10px]"></i></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'conversor':
        return <WeightConverter />;
      case 'imc':
        return <BMICalculator />;
      case 'wordpress':
        return <WordPressBridge />;
      case 'sobre':
        return <SobreNos />;
      case 'home':
      default:
        return (
          <div className="space-y-20 py-12">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4">
               <div className="relative rounded-[3rem] overflow-hidden bg-stone-900 text-white min-h-[500px] flex items-center px-12 shadow-2xl py-12">
                  <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Alimentos saudáveis sobre a mesa" />
                  <div className="relative z-10 max-w-2xl">
                    <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">Sua Dose Diária de Saúde.</h2>
                    <p className="text-xl text-stone-300 mb-10 font-medium">Ferramentas inteligentes e receitas reais para quem busca equilíbrio sem abrir mão do sabor.</p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setCurrentView('receitas')} className="bg-red-600 px-8 py-4 rounded-2xl font-black hover:bg-red-700 transition-all text-lg shadow-xl shadow-red-900/20 active:scale-95">Explorar Receitas</button>
                      <button onClick={() => setCurrentView('planner')} className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-black hover:bg-stone-100 transition-all text-lg shadow-lg active:scale-95">Planejar Semana</button>
                    </div>
                  </div>
               </div>
            </section>

            {/* Recent Posts Section (NO MEIO DO SITE) */}
            <section className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Novidades</span>
                  <h3 className="text-4xl font-black text-stone-800 tracking-tight">Postagens Recentes</h3>
                </div>
                <button 
                  onClick={() => setCurrentView('receitas')}
                  className="text-stone-400 font-bold hover:text-red-600 transition-all flex items-center gap-2 group"
                >
                  Ver todo o arquivo <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post, idx) => {
                  const isRecipe = 'ingredients' in post;
                  if (isRecipe) {
                    return <RecipeCard key={post.id} recipe={post as Recipe} onClick={() => handleRecipeClick(post as Recipe)} />;
                  }
                  return (
                    <div 
                      key={post.id} 
                      onClick={() => handleArticleClick(post as Article)}
                      className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                            Artigo
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">{(post as Article).category}</span>
                        <h4 className="text-lg font-bold text-stone-800 mb-3 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-stone-500 line-clamp-2 mb-6 flex-grow">{(post as Article).excerpt}</p>
                        <div className="pt-4 border-t border-stone-50 flex items-center justify-between">
                          <span className="text-[10px] text-stone-400 font-bold">{(post as Article).readTime} de leitura</span>
                          <i className="fa-solid fa-arrow-right text-emerald-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0"></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Featured Carousel Section */}
            <section className="pb-12">
              <div className="max-w-7xl mx-auto px-4 mb-8">
                <h3 className="text-2xl font-black text-stone-800 tracking-tight">Destaques da Comunidade</h3>
              </div>
              <PostCarousel items={latestPosts} onItemClick={(item) => 'ingredients' in item ? handleRecipeClick(item) : handleArticleClick(item)} />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} setView={setCurrentView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default App;
