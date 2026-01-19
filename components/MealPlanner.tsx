import React, { useState, useMemo } from 'react';
import { Recipe, MealPlan, MealSlotType } from '../types';

interface MealPlannerProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const MEAL_ORDER: MealSlotType[] = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'];

const MealPlanner: React.FC<MealPlannerProps> = ({ recipes, onRecipeClick }) => {
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [searchModal, setSearchModal] = useState<{ dayIdx: number; slot: MealSlotType } | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan>(
    DAYS.map(day => ({ 
      day, 
      meals: { 'Café da Manhã': null, 'Lanche da Manhã': null, 'Almoço': null, 'Lanche da Tarde': null, 'Jantar': null }
    }))
  );

  const shoppingList = useMemo(() => {
    const list: string[] = [];
    mealPlan.forEach(day => {
      Object.values(day.meals).forEach(rid => {
        if (rid) {
          const r = recipes.find(rec => String(rec.id) === String(rid));
          if (r) list.push(...r.ingredients);
        }
      });
    });
    return Array.from(new Set(list));
  }, [mealPlan, recipes]);

  const selectRecipe = (recipeId: string) => {
    if (!searchModal) return;
    const nextPlan = JSON.parse(JSON.stringify(mealPlan));
    nextPlan[searchModal.dayIdx].meals[searchModal.slot] = recipeId;
    setMealPlan(nextPlan);
    setSearchModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <header className="flex flex-col md:flex-row items-center justify-between mb-16 gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-6xl font-black text-stone-900 tracking-tighter">Plano Nutricional</h2>
          <p className="text-stone-400 text-xl font-medium italic mt-2">Organize seu ritual alimentar com precisão.</p>
        </div>
        <button 
          onClick={() => setShowShoppingList(true)}
          className="px-10 py-5 bg-stone-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl"
        >
          Lista de Compras ({shoppingList.length})
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {mealPlan.map((day, dIdx) => (
          <div key={day.day} className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-900 text-center">
              <span className="text-[11px] font-black text-white uppercase tracking-widest">{day.day}</span>
            </div>
            <div className="p-4 space-y-4">
              {MEAL_ORDER.map(slot => {
                const rid = day.meals[slot];
                const r = recipes.find(rec => String(rec.id) === String(rid));
                return (
                  <div key={slot}>
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">{slot}</p>
                    {r ? (
                      <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 cursor-pointer" onClick={() => onRecipeClick(r)}>
                        <p className="text-[11px] font-bold text-stone-900 truncate">{r.title}</p>
                      </div>
                    ) : (
                      <button onClick={() => setSearchModal({ dayIdx: dIdx, slot })} className="w-full h-10 border-2 border-dashed border-stone-100 rounded-2xl flex items-center justify-center text-stone-300 hover:border-stone-900 hover:text-stone-900 transition-all">
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {searchModal && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-stone-900/90 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-2xl font-black">Adicionar à {DAYS[searchModal.dayIdx]}</h3>
              <button onClick={() => setSearchModal(null)} className="text-stone-400 hover:text-black"><i className="fa-solid fa-times text-xl"></i></button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
              {recipes.map(r => (
                <div key={r.id} onClick={() => selectRecipe(r.id)} className="flex items-center gap-4 p-4 border rounded-2xl cursor-pointer hover:bg-stone-50">
                  <img src={r.image} className="w-12 h-12 rounded-lg object-cover" />
                  <span className="font-bold text-stone-800">{r.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showShoppingList && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-stone-900/90 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-900 text-white">
              <h3 className="text-2xl font-black">Sua Lista de Compras</h3>
              <button onClick={() => setShowShoppingList(false)} className="text-white/60 hover:text-white"><i className="fa-solid fa-times text-xl"></i></button>
            </div>
            <div className="p-10 max-h-[60vh] overflow-y-auto">
              <ul className="space-y-4">
                {shoppingList.map((ing, i) => (
                  <li key={i} className="flex items-center gap-4 text-stone-700 font-medium">
                    <div className="w-6 h-6 border-2 border-stone-200 rounded-md"></div>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;