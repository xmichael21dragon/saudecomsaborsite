
import React, { useState } from 'react';

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
        description = 'Você está abaixo do peso ideal. É importante buscar uma dieta equilibrada para ganhar massa muscular de forma saudável.';
      } else if (bmi < 24.9) {
        category = 'Peso normal';
        color = 'text-green-600';
        description = 'Parabéns! Seu peso está dentro da faixa considerada saudável. Continue mantendo uma boa alimentação e praticando exercícios.';
      } else if (bmi < 29.9) {
        category = 'Sobrepeso';
        color = 'text-yellow-600';
        description = 'Você está levemente acima do peso. Atenção à alimentação e rotina de exercícios pode ajudar a retornar à faixa saudável.';
      } else {
        category = 'Obesidade';
        color = 'text-red-500';
        description = 'Seu IMC indica obesidade. Recomendamos consultar um profissional de saúde para um plano de cuidado personalizado.';
      }

      setResult({ bmi, category, color, description });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-12 rounded-[3rem] border border-stone-100 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 -mr-32 -mt-32 rounded-full"></div>
        
        <div>
          <h2 className="text-3xl font-bold text-stone-800 mb-6">Calculadora de IMC</h2>
          <p className="text-stone-500 mb-8 leading-relaxed">
            O Índice de Massa Corporal (IMC) é uma ferramenta internacional utilizada para verificar se você está no seu peso ideal. 
            <strong> Lembre-se:</strong> Esta é uma medida de referência e não substitui uma avaliação profissional.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Seu peso (kg)</label>
              <input 
                type="number" 
                placeholder="Ex: 70"
                className="w-full p-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-blue-500 text-lg transition-all"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Sua altura (cm)</label>
              <input 
                type="number" 
                placeholder="Ex: 175"
                className="w-full p-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-blue-500 text-lg transition-all"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <button 
              onClick={calculateBMI}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
            >
              Calcular IMC
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {result ? (
            <div className="text-center bg-stone-50 p-8 rounded-[2rem] border border-stone-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Seu resultado</p>
              <div className="text-6xl font-bold text-stone-900 mb-2">{result.bmi}</div>
              <div className={`text-xl font-bold uppercase tracking-wide mb-6 ${result.color}`}>{result.category}</div>
              <p className="text-stone-600 leading-relaxed text-sm italic">
                "{result.description}"
              </p>
              
              <div className="mt-8 pt-8 border-t border-stone-200">
                <h4 className="font-bold text-stone-800 mb-4">Ações recomendadas:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                   <button className="px-4 py-2 bg-white text-xs font-bold text-red-600 rounded-full shadow-sm hover:shadow-md transition-all">
                     Ver Receitas Detox
                   </button>
                   <button className="px-4 py-2 bg-white text-xs font-bold text-blue-600 rounded-full shadow-sm hover:shadow-md transition-all">
                     Dicas Nutricionais
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 opacity-30">
              <i className="fa-solid fa-calculator text-8xl text-stone-200 mb-6 block"></i>
              <p className="text-stone-400 font-medium">Preencha os dados ao lado para ver o seu resultado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
