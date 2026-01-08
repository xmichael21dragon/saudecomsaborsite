
import React, { useState } from 'react';
import { Recipe, MealPlan } from '../types';

interface MealPlannerProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

const MealPlanner: React.FC<MealPlannerProps> = ({ recipes, onRecipeClick }) => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(
    DAYS.map(day => ({ day, meals: [] }))
  );

  const addMeal = (dayIndex: number) => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const mealTypes: ('Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche')[] = ['Café da Manhã', 'Almoço', 'Jantar', 'Lanche'];
    const type = mealTypes[Math.floor(Math.random() * mealTypes.length)];
    
    setMealPlan(prev => {
      const newPlan = [...prev];
      newPlan[dayIndex].meals.push({
        id: Math.random().toString(36).substr(2, 9),
        recipeId: randomRecipe.id,
        type
      });
      return newPlan;
    });
  };

  const removeMeal = (dayIndex: number, mealId: string) => {
    setMealPlan(prev => {
      const newPlan = [...prev];
      newPlan[dayIndex].meals = newPlan[dayIndex].meals.filter(m => m.id !== mealId);
      return newPlan;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-800">Seu Planejador Semanal</h2>
          <p className="text-stone-500">Organize suas refeições e mantenha o foco na sua saúde.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-stone-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all flex items-center gap-2">
            <i className="fa-solid fa-print"></i> Imprimir Plano
          </button>
          <button className="px-6 py-2 bg-red-100 text-red-600 rounded-2xl font-bold hover:bg-red-200 transition-all flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping"></i> Lista de Compras
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {mealPlan.map((day, idx) => (
          <div key={day.day} className="bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col min-h-[400px]">
            <div className="p-4 border-b border-stone-50 bg-stone-50/50 rounded-t-2xl">
              <h4 className="font-bold text-stone-700 text-center uppercase text-xs tracking-widest">{day.day}</h4>
            </div>
            
            <div className="p-3 flex-grow space-y-3">
              {day.meals.map(meal => {
                const recipe = recipes.find(r => r.id === meal.recipeId);
                return (
                  <div key={meal.id} className="group relative bg-red-50 p-3 rounded-xl border border-red-100 hover:shadow-md transition-all cursor-pointer" onClick={() => recipe && onRecipeClick(recipe)}>
                    <p className="text-[10px] font-bold text-red-400 uppercase mb-1">{meal.type}</p>
                    <p className="text-xs font-bold text-stone-800 line-clamp-2 leading-tight">
                      {recipe?.title}
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeMeal(idx, meal.id); }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-stone-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <i className="fa-solid fa-xmark text-[8px]"></i>
                    </button>
                  </div>
                );
              })}
              
              <button 
                onClick={() => addMeal(idx)}
                className="w-full py-3 border-2 border-dashed border-stone-100 rounded-xl text-stone-300 hover:border-red-200 hover:text-red-300 hover:bg-red-50/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <i className="fa-solid fa-plus"></i> Refeição
              </button>
            </div>

            <div className="p-3 bg-stone-50/30 border-t border-stone-50 rounded-b-2xl">
               <div className="flex justify-between text-[10px] text-stone-400 font-bold uppercase">
                 <span>Calorias</span>
                 <span className="text-stone-600">
                   {day.meals.reduce((acc, m) => acc + (recipes.find(r => r.id === m.recipeId)?.nutrition.calories || 0), 0)}
                 </span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
