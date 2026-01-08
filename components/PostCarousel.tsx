
import React, { useState, useEffect, useCallback } from 'react';
import { Recipe, Article } from '../types';

interface PostCarouselProps {
  items: (Recipe | Article)[];
  onItemClick: (item: any) => void;
}

const PostCarousel: React.FC<PostCarouselProps> = ({ items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];
  const isRecipe = 'ingredients' in currentItem;
  const themeColor = isRecipe ? 'red' : 'blue';

  return (
    <div className="relative group max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`relative h-[450px] w-full overflow-hidden rounded-[2.5rem] border-4 ${isRecipe ? 'border-red-50' : 'border-blue-50'} shadow-2xl`}>
        {/* Slide Content */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={() => onItemClick(currentItem)}
        >
          <img 
            src={currentItem.image} 
            alt={currentItem.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
            <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ${isRecipe ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
              {isRecipe ? 'Receita em Destaque' : 'Artigo de Saúde'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              {currentItem.title}
            </h2>
            <p className="text-stone-200 text-lg mb-6 line-clamp-2 max-w-xl drop-shadow">
              {isRecipe ? (currentItem as Recipe).description : (currentItem as Article).excerpt}
            </p>
            <button className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${isRecipe ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
              Ver {isRecipe ? 'Receita' : 'Artigo'} <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? `w-8 ${isRecipe ? 'bg-red-500' : 'bg-blue-500'}` : 'w-2 bg-white/30'}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCarousel;
