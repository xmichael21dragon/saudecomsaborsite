
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => (t !== null ? t - 1 : 0));
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      alert('O tempo acabou!');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-stone-500 hover:text-red-600 transition-colors font-medium"
      >
        <i className="fa-solid fa-arrow-left"></i> Voltar para receitas
      </button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider">
              {recipe.diet}
            </span>
            <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold uppercase tracking-wider">
              {recipe.difficulty}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-stone-800">{recipe.title}</h1>
          <p className="text-lg text-stone-500 mb-6 leading-relaxed">{recipe.description}</p>
          
          <div className="flex items-center gap-8 py-6 border-y border-stone-100">
            <div className="text-center">
              <p className="text-xs text-stone-400 uppercase font-bold tracking-widest mb-1">Preparo</p>
              <p className="font-bold text-stone-800">{recipe.prepTime} min</p>
            </div>
            <div className="text-center border-x border-stone-100 px-8">
              <p className="text-xs text-stone-400 uppercase font-bold tracking-widest mb-1">Cozimento</p>
              <p className="font-bold text-stone-800">{recipe.cookTime} min</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-stone-400 uppercase font-bold tracking-widest mb-1">Porções</p>
              <p className="font-bold text-stone-800">{recipe.servings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Ingredients & Nutrition */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-list-check text-red-600"></i> Ingredientes
            </h3>
            <ul className="space-y-4">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-600 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 group-hover:scale-150 transition-transform"></div>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-blue-400"></i> Nutrição
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-blue-100">Calorias</span>
                <span className="font-bold">{recipe.nutrition.calories} kcal</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-blue-100">Proteínas</span>
                <span className="font-bold">{recipe.nutrition.protein}g</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-blue-100">Carboidratos</span>
                <span className="font-bold">{recipe.nutrition.carbs}g</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-blue-100">Gorduras</span>
                <span className="font-bold">{recipe.nutrition.fat}g</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-blue-100">Fibras</span>
                <span className="font-bold">{recipe.nutrition.fiber}g</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Steps */}
        <main className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Modo de Preparo</h3>
            {timer !== null && (
              <div className="flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-2xl shadow-lg">
                <i className="fa-solid fa-hourglass-half"></i>
                <span className="font-mono font-bold text-lg">{formatTime(timer)}</span>
                <button 
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="bg-white/20 hover:bg-white/30 p-1 rounded"
                >
                  <i className={`fa-solid ${isTimerRunning ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {recipe.instructions.map((step, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl transition-all border ${activeStep === i ? 'bg-red-50 border-red-200 shadow-md scale-[1.02]' : 'bg-white border-stone-100 hover:border-red-200'} cursor-pointer`}
                onClick={() => setActiveStep(i)}
              >
                <div className="flex gap-4">
                  <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${activeStep === i ? 'bg-red-600 text-white shadow-lg' : 'bg-stone-100 text-stone-400'}`}>
                    {i + 1}
                  </span>
                  <div>
                    <p className={`text-lg leading-relaxed ${activeStep === i ? 'text-stone-800' : 'text-stone-500'}`}>
                      {step}
                    </p>
                    {activeStep === i && (
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); startTimer(5); }}
                          className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-200 transition-colors"
                        >
                          <i className="fa-solid fa-timer mr-1"></i> Timer 5 min
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); startTimer(10); }}
                          className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-200 transition-colors"
                        >
                          <i className="fa-solid fa-timer mr-1"></i> Timer 10 min
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Section Simulation */}
          <section className="mt-16 pt-12 border-t border-stone-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-stone-800">Avaliações e Comentários</h3>
              <button className="bg-stone-900 text-white px-6 py-2 rounded-2xl font-bold hover:bg-red-600 transition-all">
                Escrever Avaliação
              </button>
            </div>
            {recipe.reviews.length > 0 ? (
              <div className="space-y-8">
                {recipe.reviews.map(review => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl border border-stone-100">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={`https://picsum.photos/seed/${review.user}/40/40`} className="w-10 h-10 rounded-full" alt={review.user} />
                      <div>
                        <p className="font-bold text-stone-800">{review.user}</p>
                        <div className="flex gap-1 text-yellow-500 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-solid fa-star ${i >= review.rating ? 'opacity-20' : ''}`}></i>
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-xs text-stone-400">{review.date}</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                <i className="fa-regular fa-comment-dots text-4xl text-stone-300 mb-4 block"></i>
                <p className="text-stone-400">Ninguém comentou ainda. Seja o primeiro!</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default RecipeDetail;
