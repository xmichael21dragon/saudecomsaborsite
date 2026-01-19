
import React, { useState } from 'react';
import { Recipe } from '../types';
import AdBanner from './AdBanner';
import CommentSection from './CommentSection';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: recipe.title,
      text: `Confira esta receita incrível: ${recipe.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Erro ao compartilhar', err);
      }
    } else {
      // Fallback para cópia de link se a API nativa não existir
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Veja esta receita: ${recipe.title} - ${window.location.href}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    email: `mailto:?subject=${encodeURIComponent(recipe.title)}&body=${encodeURIComponent(`Confira esta receita no Saúde com Sabor: ${window.location.href}`)}`
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <button onClick={onBack} className="mb-12 flex items-center gap-3 text-stone-400 hover:text-red-600 transition-all font-black text-sm uppercase tracking-widest group">
        <i className="fa-solid fa-arrow-left text-base group-hover:-translate-x-1 transition-transform"></i> Voltar para receitas
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className={`relative h-[600px] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.3)] md:rotate-1 bg-stone-100 transition-all duration-700 ${imageLoaded ? 'bg-transparent' : 'animate-pulse'}`}>
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
          />
          <div className="absolute top-8 left-8">
            <span className="px-6 py-3 bg-white/90 backdrop-blur-md text-red-600 rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-2xl border border-white/20">
              {recipe.diet}
            </span>
          </div>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
               <i className="fa-solid fa-image text-stone-200 text-6xl"></i>
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-center">
          <nav className="flex items-center gap-3 mb-8 text-xs font-black uppercase tracking-[0.2em]">
            <span className="text-red-500">{recipe.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
            <span className="text-stone-400">{recipe.subcategory}</span>
          </nav>
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-stone-800 leading-[1] tracking-tighter">{recipe.title}</h1>
          
          {/* Barra de Compartilhamento Social */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button 
              onClick={handleShare}
              className="flex items-center gap-3 px-6 py-3 bg-stone-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg"
            >
              <i className="fa-solid fa-share-nodes"></i> Compartilhar
            </button>
            <div className="h-6 w-[1px] bg-stone-200 mx-2"></div>
            <div className="flex gap-2">
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm">
                <i className="fa-brands fa-whatsapp text-lg"></i>
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <i className="fa-brands fa-facebook-f text-lg"></i>
              </a>
              <a href={shareLinks.email} className="w-10 h-10 rounded-xl bg-stone-50 text-stone-600 flex items-center justify-center hover:bg-stone-600 hover:text-white transition-all shadow-sm">
                <i className="fa-solid fa-envelope text-lg"></i>
              </a>
              <button 
                onClick={copyToClipboard}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${copyFeedback ? 'bg-emerald-600 text-white' : 'bg-stone-50 text-stone-400 hover:bg-stone-200'}`}
                title="Copiar Link"
              >
                <i className={`fa-solid ${copyFeedback ? 'fa-check' : 'fa-link'} text-lg`}></i>
              </button>
            </div>
          </div>

          <p className="text-2xl text-stone-500 mb-12 leading-relaxed italic font-serif">"{recipe.description}"</p>
          
          <div className="grid grid-cols-3 gap-6 py-10 border-y-2 border-stone-50">
            <div className="text-center">
              <p className="text-xs text-stone-400 uppercase font-black tracking-widest mb-3">Preparo</p>
              <p className="font-black text-stone-800 text-3xl">{recipe.prepTime}m</p>
            </div>
            <div className="text-center border-x-2 border-stone-50">
              <p className="text-xs text-stone-400 uppercase font-black tracking-widest mb-3">Cozimento</p>
              <p className="font-black text-stone-800 text-3xl">{recipe.cookTime}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-stone-400 uppercase font-black tracking-widest mb-3">Porções</p>
              <p className="font-black text-stone-800 text-3xl">{recipe.servings}</p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner className="mb-24" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-24">
        <aside className="lg:col-span-1 space-y-16">
          <section className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-xl">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <i className="fa-solid fa-carrot"></i>
              </span> 
              Ingredientes
            </h3>
            <ul className="space-y-6">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-5 text-stone-600 text-lg font-medium leading-tight">
                  <div className="mt-2 w-2.5 h-2.5 rounded-full border-2 border-red-500 flex-shrink-0"></div>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-stone-900 text-white p-12 rounded-[3.5rem] shadow-2xl transform hover:scale-[1.02] transition-transform">
            <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6"><i className="fa-solid fa-chart-line text-red-500 mr-3"></i> Nutrição</h3>
            <div className="space-y-6">
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                  <span className="text-stone-400 text-xs font-black uppercase tracking-widest">{key}</span>
                  <span className="text-xl font-black">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="lg:col-span-2">
          <h2 className="text-4xl font-black text-stone-800 mb-16 tracking-tight">Modo de Preparo</h2>
          <div className="space-y-10">
            {recipe.instructions.map((step, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[3rem] border-2 transition-all cursor-pointer ${activeStep === i ? 'bg-white border-red-100 shadow-2xl scale-[1.02]' : 'bg-stone-50/30 border-stone-50 hover:bg-stone-50'}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="flex gap-8">
                  <span className={`flex-shrink-0 w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl transition-colors ${activeStep === i ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-400'}`}>
                    {i + 1}
                  </span>
                  <p className={`text-xl leading-relaxed font-medium ${activeStep === i ? 'text-stone-800' : 'text-stone-500'}`}>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <CommentSection contentId={recipe.id} type="recipe" />

      <AdBanner className="mt-24" />
    </article>
  );
};

export default RecipeDetail;
