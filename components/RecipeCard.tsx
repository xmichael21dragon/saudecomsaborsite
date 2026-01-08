
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-red-600 uppercase tracking-wider rounded-md shadow-sm">
            {recipe.diet}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
            <i className="fa-solid fa-star text-yellow-500 text-xs"></i>
            <span className="text-xs font-bold">{recipe.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mb-1">{recipe.category}</p>
        <h3 className="text-lg font-bold text-stone-800 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-stone-50">
          <div className="flex items-center gap-3 text-stone-400 text-xs">
            <span className="flex items-center gap-1">
              <i className="fa-regular fa-clock"></i>
              {recipe.prepTime + recipe.cookTime} min
            </span>
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-chart-simple"></i>
              {recipe.difficulty}
            </span>
          </div>
          <button className="w-8 h-8 rounded-full bg-stone-50 text-stone-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
