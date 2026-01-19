import React, { useState } from 'react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{ bmi: number; label: string; color: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let label = '';
      let color = 'text-stone-900';
      if (bmi < 18.5) { label = 'Abaixo do peso'; color = 'text-blue-500'; }
      else if (bmi < 24.9) { label = 'Peso ideal'; color = 'text-emerald-500'; }
      else if (bmi < 29.9) { label = 'Sobrepeso'; color = 'text-orange-500'; }
      else { label = 'Obesidade'; color = 'text-red-500'; }
      setResult({ bmi, label, color });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <h2 className="text-7xl font-black text-stone-900 mb-8 tracking-tighter">Cálculo de IMC</h2>
      <p className="text-stone-400 text-xl font-medium italic mb-16">Monitore sua composição física com precisão científica.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-16 rounded-[4rem] shadow-2xl border border-stone-100">
        <div className="space-y-8 text-left">
          <div>
            <label className="text-[10px] font-black uppercase text-stone-400 mb-2 block ml-4">Peso (kg)</label>
            <input type="number" className="w-full p-6 rounded-3xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none text-2xl font-bold" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 75" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-stone-400 mb-2 block ml-4">Altura (cm)</label>
            <input type="number" className="w-full p-6 rounded-3xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none text-2xl font-bold" value={height} onChange={e => setHeight(e.target.value)} placeholder="Ex: 175" />
          </div>
          <button onClick={calculate} className="w-full py-6 bg-stone-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">Calcular Agora</button>
        </div>

        <div className="flex flex-col items-center justify-center h-full border-l border-stone-100">
          {result ? (
            <div className="animate-slide-up">
              <span className="text-[10rem] font-black leading-none text-stone-900">{result.bmi}</span>
              <p className={`text-4xl font-black uppercase tracking-tighter ${result.color}`}>{result.label}</p>
            </div>
          ) : (
            <div className="opacity-10 text-stone-300">
              <i className="fa-solid fa-calculator text-[10rem]"></i>
              <p className="font-bold uppercase mt-4">Aguardando Dados...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;