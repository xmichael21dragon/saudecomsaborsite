import React, { useState } from 'react';
import { Recipe } from '../types';
import AdBanner from './AdBanner';
import CommentSection from './CommentSection';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const [multiplier, setMultiplier] = useState(1);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const scaleIng = (ing: string) => {
    if (multiplier === 1) return ing;
    return ing.replace(/^([\d.,/]+)/, (match) => {
      const num = parseFloat(match.replace(',', '.'));
      if (isNaN(num)) return match;
      return (num * multiplier).toFixed(1).replace('.', ',');
    });
  };

  return (
    <article className="max-w-6xl mx-auto px-4 py-12 animate-slide-up">
      <button onClick={onBack} className="mb-12 flex items-center gap-3 text-stone-400 hover:text-red-600 transition-all font-black text-xs uppercase tracking-widest">
        <i className="fa-solid fa-arrow-left"></i> Voltar para receitas
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <div className="relative h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute top-8 left-8">
            <span className="px-6 py-3 bg-white/95 backdrop-blur-md text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
              {recipe.diet}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-[#D2691E] text-xs font-black uppercase tracking-[0.4em] mb-4">{recipe.subcategory}</span>
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-[0.9] tracking-tighter mb-8">{recipe.title}</h1>
          
          <div className="grid grid-cols-3 gap-6 py-8 border-y-2 border-stone-50 mb-12">
            <div className="text-center">
              <p className="text-[10px] font-black text-stone-400 uppercase mb-2">Preparo</p>
              <p className="text-2xl font-black">{recipe.prepTime}m</p>
            </div>
            <div className="text-center border-x-2 border-stone-50">
              <p className="text-[10px] font-black text-stone-400 uppercase mb-2">Cozimento</p>
              <p className="text-2xl font-black">{recipe.cookTime}m</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-stone-400 uppercase mb-2">Porções</p>
              <p className="text-2xl font-black">{Math.round(recipe.servings * multiplier)}</p>
            </div>
          </div>

          <div className="bg-stone-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="text-xl font-bold mb-6">Ajustar Quantidade</h3>
            <div className="flex gap-4">
              {[1, 1.5, 2].map(m => (
                <button 
                  key={m} 
                  onClick={() => setMultiplier(m)}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${multiplier === m ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  {m}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <aside className="lg:col-span-4">
          <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl sticky top-32">
            <h3 className="text-2xl font-black mb-10 text-stone-800">Ingredientes</h3>
            <ul className="space-y-6">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-4 text-stone-600 font-medium">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
                  <span>{scaleIng(ing)}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-8">
          <h2 className="text-4xl font-black text-stone-900 mb-12">Modo de Preparo</h2>
          <div className="space-y-10">
            {recipe.instructions.map((step, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[2.5rem] border-2 transition-all cursor-pointer ${activeStep === i ? 'bg-white border-red-100 shadow-xl' : 'bg-stone-50/50 border-transparent hover:bg-stone-50'}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="flex gap-8">
                  <span className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xl ${activeStep === i ? 'bg-red-600 text-white' : 'bg-stone-200 text-stone-400'}`}>
                    {i + 1}
                  </span>
                  <p className="text-xl leading-relaxed font-medium text-stone-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-24 pt-24 border-t border-stone-100">
        <CommentSection contentId={recipe.id} type="recipe" />
      </div>
      <AdBanner />
    </article>
  );
};

export default RecipeDetail;