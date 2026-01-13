
import React, { useState } from 'react';
import AdBanner from './AdBanner';

const WeightConverter: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('xicara');
  const [ingredient, setIngredient] = useState<string>('agua');

  const density: Record<string, number> = {
    agua: 240, farinha: 120, acucar: 200, manteiga: 230, arroz: 200, cacau: 100, aveia: 90, leite: 245, sal: 300, oleo: 220
  };

  const calculate = () => {
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) return null;

    let grams = 0;
    if (fromUnit === 'xicara') grams = val * density[ingredient];
    else if (fromUnit === 'colher_sopa') grams = val * (density[ingredient] / 16);
    else if (fromUnit === 'colher_cha') grams = val * (density[ingredient] / 48);
    else grams = val;

    return {
      grams: grams.toFixed(1),
      kg: (grams / 1000).toFixed(3),
      ml: grams.toFixed(1)
    };
  };

  const results = calculate();

  const inputStyles = "w-full p-5 rounded-2xl bg-stone-100 border-2 border-stone-200 focus:border-red-500 focus:bg-white focus:shadow-lg outline-none transition-all text-xl font-bold text-stone-800 placeholder:text-stone-400";
  const labelStyles = "text-[11px] font-black text-stone-600 uppercase tracking-[0.15em] ml-1 flex items-center gap-2 mb-2";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl font-black text-stone-800 mb-4 tracking-tighter">Conversor de Medidas</h2>
        <p className="text-stone-500 max-w-lg mx-auto font-medium text-lg">Precisão absoluta para suas receitas darem sempre certo.</p>
      </div>

      <AdBanner className="mb-12" />

      {/* Container Principal com melhor definição e borda visível */}
      <div className="bg-white rounded-[3.5rem] p-8 md:p-14 border-2 border-stone-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Campo Quantidade */}
          <div className="flex flex-col">
            <label className={labelStyles}>
              <i className="fa-solid fa-scale-balanced text-red-500"></i> Quantidade
            </label>
            <div className="relative group">
              <input 
                type="number" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="0.0"
                className={inputStyles} 
              />
            </div>
          </div>

          {/* Campo Medida */}
          <div className="flex flex-col">
            <label className={labelStyles}>
              <i className="fa-solid fa-spoon text-stone-400"></i> Medida
            </label>
            <div className="relative">
              <select 
                value={fromUnit} 
                onChange={(e) => setFromUnit(e.target.value)} 
                className={inputStyles}
              >
                <option value="xicara">Xícaras</option>
                <option value="colher_sopa">Colheres Sopa</option>
                <option value="colher_cha">Colheres Chá</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Campo Ingrediente */}
          <div className="flex flex-col">
            <label className={labelStyles}>
              <i className="fa-solid fa-wheat-awn text-green-600"></i> Ingrediente
            </label>
            <div className="relative">
              <select 
                value={ingredient} 
                onChange={(e) => setIngredient(e.target.value)} 
                className={inputStyles}
              >
                <option value="agua">Água / Líquidos</option>
                <option value="leite">Leite</option>
                <option value="farinha">Farinha de Trigo</option>
                <option value="acucar">Açúcar Refinado</option>
                <option value="manteiga">Manteiga / Margarina</option>
                <option value="arroz">Arroz</option>
                <option value="aveia">Aveia</option>
                <option value="cacau">Cacau em Pó</option>
                <option value="oleo">Óleo</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        {/* Resultados com design de impacto */}
        {results ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-stone-50 p-8 rounded-[2rem] text-center border-2 border-stone-100 shadow-sm group hover:border-red-200 transition-all">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Grama (g)</p>
              <p className="text-4xl font-black text-stone-800 group-hover:text-red-600 transition-colors">{results.grams}<span className="text-lg ml-1 text-stone-300">g</span></p>
            </div>
            <div className="bg-stone-50 p-8 rounded-[2rem] text-center border-2 border-stone-100 shadow-sm group hover:border-red-200 transition-all">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Quilo (kg)</p>
              <p className="text-4xl font-black text-stone-800 group-hover:text-red-600 transition-colors">{results.kg}<span className="text-lg ml-1 text-stone-300">kg</span></p>
            </div>
            <div className="bg-stone-50 p-8 rounded-[2rem] text-center border-2 border-stone-100 shadow-sm group hover:border-red-200 transition-all">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Mililitro (ml)</p>
              <p className="text-4xl font-black text-stone-800 group-hover:text-red-600 transition-colors">{results.ml}<span className="text-lg ml-1 text-stone-300">ml</span></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-30">
            <i className="fa-solid fa-calculator text-6xl mb-4 text-stone-300"></i>
            <p className="font-bold uppercase tracking-widest text-xs text-stone-400">Aguardando valores...</p>
          </div>
        )}
      </div>

      <div className="bg-stone-100 p-8 rounded-[2.5rem] text-center mb-12 border border-stone-200">
        <p className="text-sm text-stone-600 font-medium leading-relaxed">
          <i className="fa-solid fa-circle-info mr-2 text-stone-400"></i>
          <strong>Dica:</strong> As conversões são baseadas na densidade média dos ingredientes. Para resultados perfeitos, use sempre uma balança de cozinha.
        </p>
      </div>

      <AdBanner />
    </div>
  );
};

export default WeightConverter;
