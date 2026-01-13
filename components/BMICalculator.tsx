
import React, { useState } from 'react';
import AdBanner from './AdBanner';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    description: string;
  } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = '';
      let color = '';
      let description = '';

      if (bmi < 18.5) {
        category = 'Abaixo do peso';
        color = 'text-blue-500';
        description = 'Você está abaixo do peso ideal. É importante buscar orientação nutricional.';
      } else if (bmi < 24.9) {
        category = 'Peso normal';
        color = 'text-emerald-600';
        description = 'Parabéns! Seu peso está dentro da faixa considerada saudável pela OMS.';
      } else if (bmi < 29.9) {
        category = 'Sobrepeso';
        color = 'text-orange-600';
        description = 'Atenção: Você está levemente acima do peso ideal para sua altura.';
      } else {
        category = 'Obesidade';
        color = 'text-red-500';
        description = 'Alerta: Seu IMC indica obesidade. Procure um profissional de saúde para avaliação.';
      }

      setResult({ bmi, category, color, description });
    }
  };

  const inputStyles = "w-full p-5 rounded-2xl bg-stone-100 border-2 border-stone-200 focus:border-blue-600 focus:bg-white focus:shadow-lg outline-none transition-all text-xl font-bold text-stone-800 placeholder:text-stone-400";
  const labelStyles = "text-[11px] font-black text-stone-600 uppercase tracking-[0.15em] ml-1 flex items-center gap-2 mb-2";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-stone-800 mb-4 tracking-tighter">Índice de Massa Corporal</h2>
        <p className="text-stone-500 max-w-lg mx-auto font-medium text-lg italic">Uma métrica essencial para monitorar sua saúde física.</p>
      </div>

      <AdBanner className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 md:p-14 rounded-[3.5rem] border-2 border-stone-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden relative mb-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className={labelStyles}>
                <i className="fa-solid fa-weight-scale text-blue-500"></i> Seu peso (kg)
              </label>
              <input 
                type="number" 
                placeholder="Ex: 75.5"
                className={inputStyles}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col">
              <label className={labelStyles}>
                <i className="fa-solid fa-ruler-vertical text-blue-500"></i> Sua altura (cm)
              </label>
              <input 
                type="number" 
                placeholder="Ex: 175"
                className={inputStyles}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            
            <button 
              onClick={calculateBMI}
              className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-stone-900 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
            >
              <i className="fa-solid fa-calculator"></i> Calcular IMC Agora
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {result ? (
            <div className="text-center bg-stone-50 p-10 rounded-[3rem] border-2 border-stone-100 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-2 ${result.color.replace('text-', 'bg-')}`}></div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] mb-4">Resultado Analisado</p>
              <div className="text-7xl font-black text-stone-900 mb-2 tracking-tighter">{result.bmi}</div>
              <div className={`text-xl font-black uppercase tracking-widest mb-6 ${result.color}`}>{result.category}</div>
              <div className="w-12 h-1 bg-stone-200 mx-auto mb-6"></div>
              <p className="text-stone-500 leading-relaxed text-sm font-medium italic">"{result.description}"</p>
            </div>
          ) : (
            <div className="text-center p-12 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center transition-all group hover:bg-white hover:border-blue-200">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-stone-300 text-4xl mb-6 shadow-sm group-hover:text-blue-200 transition-colors border border-stone-100">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <p className="text-stone-400 font-black uppercase tracking-widest text-[10px]">Aguardando dados...</p>
              <p className="text-stone-400 text-xs mt-2 font-medium">Insira seu peso e altura para ver o resultado.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-stone-100 p-8 rounded-[2.5rem] text-center mb-12 border border-stone-200">
        <p className="text-sm text-stone-600 font-medium leading-relaxed">
          <i className="fa-solid fa-circle-info mr-2 text-stone-400"></i>
          <strong>Nota:</strong> O IMC é uma medida internacional, mas não considera massa muscular ou densidade óssea individualmente.
        </p>
      </div>

      <AdBanner />
    </div>
  );
};

export default BMICalculator;
