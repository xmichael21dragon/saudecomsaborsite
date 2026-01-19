
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
  const [searchTerm, setSearchTerm] = useState('');
  
  const [mealPlan, setMealPlan] = useState<MealPlan>(
    DAYS.map(day => ({ 
      day, 
      meals: {
        'Café da Manhã': null, 'Lanche da Manhã': null,
        'Almoço': null, 'Lanche da Tarde': null, 'Jantar': null
      }
    }))
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  const shoppingList = useMemo(() => {
    const counts: Record<string, { count: number; name: string; recipes: string[] }> = {};
    mealPlan.forEach(day => {
      Object.entries(day.meals).forEach(([slot, recipeId]) => {
        if (recipeId) {
          const recipe = recipes.find(r => String(r.id) === String(recipeId));
          if (recipe && recipe.ingredients) {
            recipe.ingredients.forEach((ing) => {
              const key = ing.trim().toLowerCase();
              if (!counts[key]) {
                counts[key] = { count: 0, name: ing.trim(), recipes: [] };
              }
              counts[key].count += 1;
              if (!counts[key].recipes.includes(recipe.title)) {
                counts[key].recipes.push(recipe.title);
              }
            });
          }
        }
      });
    });
    return Object.values(counts).sort((a, b) => a.name.localeCompare(b.name));
  }, [mealPlan, recipes]);

  const selectRecipe = (recipeId: string) => {
    if (!searchModal) return;
    const nextPlan = JSON.parse(JSON.stringify(mealPlan));
    nextPlan[searchModal.dayIdx].meals[searchModal.slot] = recipeId;
    setMealPlan(nextPlan);
    setSearchModal(null);
    setSearchTerm('');
  };

  const triggerCopyShoppingList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (shoppingList.length === 0) {
      alert("Sua lista está vazia!");
      return;
    }

    const text = "🛒 LISTA DE COMPRAS - SAÚDE COM SABOR\n\n" + 
      shoppingList.map(item => `• ${item.name} ${item.count > 1 ? `(x${item.count})` : ''}`).join('\n');
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Lista copiada!");
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try { document.execCommand('copy'); alert("Copiado!"); } catch (err) {}
    document.body.removeChild(textArea);
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowShoppingList(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" id="meal-planner-view">
      
      {/* PLANEJADOR PRINCIPAL NA TELA */}
      <div className={showShoppingList ? 'no-print' : 'print-area'}>
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-10 no-print relative">
          <div className="text-center md:text-left">
            <h2 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter mb-4 leading-none uppercase">Plano Nutricional</h2>
            <p className="text-stone-500 text-xl md:text-3xl font-bold italic">Seu guia alimentar para a semana.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowShoppingList(true); }}
              className="btn-action-trigger group flex items-center justify-center gap-4 bg-stone-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-2xl active:scale-95"
            >
              <i className="fa-solid fa-list-check text-lg text-emerald-400"></i>
              <span>Lista de Compras ({shoppingList.length})</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-20 print:grid-cols-1">
          {mealPlan.map((day, dayIdx) => (
            <div key={day.day} className="bg-white rounded-[2.5rem] border-2 border-stone-100 shadow-sm overflow-hidden flex flex-col print:rounded-none print:border-none">
              <div className="p-4 bg-stone-900 text-center print:bg-stone-50 print:border-b-4 print:border-stone-900">
                <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] print:text-stone-900">{day.day}</span>
              </div>
              <div className="p-4 space-y-6 flex-grow print:space-y-8">
                {MEAL_ORDER.map((slot) => {
                  const recipeId = day.meals[slot];
                  const recipe = recipes.find(r => String(r.id) === String(recipeId));
                  return (
                    <div key={slot} className="relative">
                      <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2 ml-1 print:text-stone-500 print:text-xs">{slot}</p>
                      {recipe ? (
                        <div className="bg-stone-50 p-4 rounded-3xl border border-stone-200 print:bg-white print:border-stone-100 print:p-0">
                          <p className="text-[12px] font-bold text-stone-900 leading-tight print:text-lg">{recipe.title}</p>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const next = JSON.parse(JSON.stringify(mealPlan));
                              next[dayIdx].meals[slot] = null;
                              setMealPlan(next);
                            }}
                            className="mt-3 text-[9px] font-black text-red-500 uppercase tracking-widest no-print"
                          >
                            Remover
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSearchModal({ dayIdx, slot }); }}
                          className="w-full h-14 border-2 border-dashed border-stone-100 rounded-3xl flex items-center justify-center text-stone-200 transition-all no-print"
                        >
                          <i className="fa-solid fa-plus text-sm"></i>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL LISTA DE COMPRAS */}
      {showShoppingList && (
        <div 
          className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-2xl no-print"
          onClick={() => closeModal()}
        >
          <div 
            className="bg-white rounded-[4rem] w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in border border-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-10 border-b border-stone-100 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter">Lista de Compras</h3>
                <p className="text-emerald-400 text-[11px] font-black uppercase tracking-[0.3em] mt-2">Ingredientes Necessários</p>
              </div>
              <button 
                type="button"
                onClick={(e) => closeModal(e)}
                className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-2xl"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-10 space-y-5 custom-scrollbar">
              {shoppingList.length > 0 ? (
                shoppingList.map((item) => (
                  <div key={item.name} className="flex items-center gap-6 p-6 rounded-[2rem] border border-stone-100 bg-stone-50/50">
                    <div className="w-8 h-8 rounded-xl border-2 border-stone-300 flex-shrink-0"></div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4">
                        <span className="font-black text-stone-800 text-xl tracking-tight">{item.name}</span>
                        {item.count > 1 && (
                          <span className="px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-[11px] font-black">x{item.count}</span>
                        )}
                      </div>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-2 italic">Usado em: {item.recipes.join(', ')}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 opacity-40">
                  <i className="fa-solid fa-cart-shopping text-7xl mb-6"></i>
                  <p className="font-black uppercase tracking-widest text-sm">Sua lista está vazia</p>
                </div>
              )}
            </div>

            <div className="p-10 bg-stone-50 border-t border-stone-100 flex flex-col gap-4">
              <button 
                type="button"
                onClick={triggerCopyShoppingList}
                disabled={shoppingList.length === 0}
                className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-emerald-700 transition-all shadow-xl active:scale-95 disabled:opacity-50 btn-action-trigger flex items-center justify-center gap-3"
              >
                <i className="fa-solid fa-copy text-lg"></i> Copiar Lista de Compras
              </button>
              <button 
                type="button"
                onClick={(e) => closeModal(e)}
                className="w-full py-5 bg-stone-200 text-stone-600 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-stone-300 transition-all btn-action-trigger"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BUSCA RECEITA */}
      {searchModal && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-stone-900/98 backdrop-blur-3xl no-print">
          <div className="bg-white rounded-[4rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in border border-stone-100">
            <div className="p-10 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Escolher Receita</h3>
                <p className="text-stone-400 text-[11px] font-black uppercase tracking-widest mt-2">{DAYS[searchModal.dayIdx]} • {searchModal.slot}</p>
              </div>
              <button onClick={() => setSearchModal(null)} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>
            <div className="p-8 bg-stone-50 border-b border-stone-100">
              <input 
                type="text" 
                placeholder="Pesquisar prato..." 
                className="w-full p-6 rounded-[2rem] bg-white border-2 border-transparent focus:border-stone-900 outline-none transition-all font-bold shadow-sm text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex-grow overflow-y-auto p-8 space-y-4">
              {filteredRecipes.map(recipe => (
                <div 
                  key={recipe.id}
                  onClick={() => selectRecipe(recipe.id)}
                  className="flex items-center gap-6 p-6 rounded-[2.5rem] border border-stone-100 hover:border-stone-900 hover:bg-stone-50 cursor-pointer transition-all group"
                >
                  <img src={recipe.image} className="w-20 h-20 rounded-[1.5rem] object-cover" />
                  <div className="min-w-0">
                    <h4 className="font-black text-stone-800 text-xl truncate group-hover:text-black">{recipe.title}</h4>
                    <p className="text-[11px] font-black text-red-500 uppercase tracking-widest mt-2">{recipe.diet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
