
import React, { useState } from 'react';
import AdBanner from './AdBanner';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    bg: string;
    description: string;
    position: number;
  } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = '';
      let color = '';
      let bg = '';
      let description = '';
      let position = 0;

      if (bmi < 18.5) {
        category = 'Abaixo do peso';
        color = 'text-blue-600';
        bg = 'bg-blue-600';
        description = 'Seu peso está abaixo do ideal. Recomendamos uma consulta com nutricionista.';
        position = Math.min(Math.max((bmi / 18.5) * 20, 5), 18);
      } else if (bmi < 24.9) {
        category = 'Peso normal';
        color = 'text-emerald-600';
        bg = 'bg-emerald-600';
        description = 'Excelente! Você está na faixa de peso ideal. Continue assim!';
        position = 40;
      } else if (bmi < 29.9) {
        category = 'Sobrepeso';
        color = 'text-orange-600';
        bg = 'bg-orange-600';
        description = 'Você está levemente acima do peso. Atenção aos seus hábitos diários.';
        position = 65;
      } else {
        category = 'Obesidade';
        color = 'text-red-600';
        bg = 'bg-red-600';
        description = 'Atenção: Procure orientação de um profissional de saúde para um plano adequado.';
        position = Math.min(85 + (bmi - 30), 95);
      }

      setResult({ bmi, category, color, bg, description, position });
    }
  };

  const inputStyles = "w-full p-6 rounded-[2rem] bg-white border border-stone-200 focus:border-black focus:ring-0 outline-none transition-all text-3xl font-black text-stone-900 placeholder:text-stone-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]";
  const labelStyles = "text-[12px] font-black text-stone-400 uppercase tracking-[0.3em] ml-4 flex items-center gap-3 mb-4";

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-fade-in">
      {/* Header Estilizado */}
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-3 px-8 py-3 bg-stone-100 rounded-full mb-8 shadow-sm">
          <div className="w-2 h-2 bg-[#2e7d32] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">Saúde & Performance</span>
        </div>
        <h2 className="text-7xl md:text-9xl font-black text-stone-900 mb-8 tracking-tighter leading-none">
          Calculadora <span className="text-transparent bg-clip-text bg-gradient-to-br from-stone-800 to-stone-400">IMC</span>
        </h2>
        <p className="text-stone-400 max-w-2xl mx-auto font-bold text-xl md:text-2xl leading-relaxed italic">
          Analise sua composição física com precisão absoluta.
        </p>
      </div>

      <AdBanner className="mb-20" />

      {/* Seção de Entrada e Resultado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
        
        {/* Lado A: Inputs Nítidos */}
        <div className="bg-[#f8f8f7] p-10 md:p-16 rounded-[4rem] border border-stone-100 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.08)]">
          <div className="space-y-12">
            <div className="group">
              <label className={labelStyles}>
                <i className="fa-solid fa-weight-scale opacity-30 group-focus-within:opacity-100 transition-opacity"></i> Seu peso (KG)
              </label>
              <input 
                type="number" 
                placeholder="00.0"
                className={inputStyles}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="group">
              <label className={labelStyles}>
                <i className="fa-solid fa-ruler-vertical opacity-30 group-focus-within:opacity-100 transition-opacity"></i> Sua altura (CM)
              </label>
              <input 
                type="number" 
                placeholder="000"
                className={inputStyles}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <button 
              onClick={calculateBMI}
              className="w-full py-8 bg-stone-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-black hover:scale-[1.02] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all active:scale-95 flex items-center justify-center gap-6 group"
            >
              <span>Calcular agora</span>
              <i className="fa-solid fa-chevron-right text-[10px] opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all"></i>
            </button>
          </div>
        </div>

        {/* Lado B: Resultado Visual */}
        <div className="h-full">
          {result ? (
            <div className="bg-white p-12 md:p-20 rounded-[4rem] border-2 border-stone-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col justify-center h-full relative overflow-hidden animate-fade-in">
              <div className={`absolute -top-20 -right-20 w-80 h-80 ${result.bg} opacity-[0.04] rounded-full blur-[100px]`}></div>
              
              <div className="relative z-10">
                <span className="text-[12px] font-black text-stone-300 uppercase tracking-[0.5em] mb-6 block">Diagnóstico Atual</span>
                <div className="flex items-baseline gap-4 mb-10">
                  <h3 className="text-[12rem] font-black text-stone-900 tracking-tighter leading-none">{result.bmi}</h3>
                  <span className={`text-4xl font-black ${result.color} italic tracking-tighter`}>IMC</span>
                </div>
                
                <div className={`inline-flex items-center gap-4 px-8 py-3 ${result.bg} text-white rounded-2xl mb-10 shadow-xl`}>
                  <i className="fa-solid fa-circle-check"></i>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">{result.category}</span>
                </div>

                <p className="text-stone-500 text-2xl font-bold leading-tight max-w-md italic border-l-4 border-stone-100 pl-8">
                  "{result.description}"
                </p>

                {/* Régua de Saúde */}
                <div className="mt-16 space-y-6">
                  <div className="h-4 w-full bg-stone-100 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="h-full w-[18.5%] bg-blue-500/20"></div>
                      <div className="h-full w-[25%] bg-emerald-500/20"></div>
                      <div className="h-full w-[25%] bg-orange-500/20"></div>
                      <div className="h-full w-[31.5%] bg-red-500/20"></div>
                    </div>
                    <div 
                      className={`absolute top-0 bottom-0 w-2 ${result.bg} shadow-2xl transition-all duration-1000 ease-out`}
                      style={{ left: `${result.position}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[9px] font-black text-stone-400 uppercase tracking-widest px-2">
                    <span>Magreza</span>
                    <span>Ideal</span>
                    <span>Sobrepeso</span>
                    <span>Obesidade</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-stone-50 rounded-[4rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center p-20 text-center">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-stone-200 text-4xl mb-8 shadow-sm">
                <i className="fa-solid fa-calculator-combined animate-pulse"></i>
              </div>
              <h4 className="text-2xl font-black text-stone-400 tracking-tighter uppercase mb-4">Aguardando Dados</h4>
              <p className="text-stone-300 font-medium max-w-[280px]">Preencha seu peso e altura para gerar o diagnóstico instantâneo.</p>
            </div>
          )}
        </div>
      </div>

      {/* Legenda de Referência */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Abaixo', range: '< 18.5', color: 'bg-blue-500', text: 'text-blue-500' },
          { label: 'Saudável', range: '18.5 - 24.9', color: 'bg-emerald-500', text: 'text-emerald-500' },
          { label: 'Sobrepeso', range: '25 - 29.9', color: 'bg-orange-500', text: 'text-orange-500' },
          { label: 'Obesidade', range: '> 30', color: 'bg-red-500', text: 'text-red-500' }
        ].map((item) => (
          <div key={item.label} className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-8 h-1.5 ${item.color} rounded-full mb-6 group-hover:w-full transition-all duration-500`}></div>
            <h5 className="font-black text-stone-900 uppercase tracking-tighter text-xl mb-1">{item.label}</h5>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.text}`}>{item.range}</span>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 md:p-20 bg-stone-900 rounded-[5rem] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2e7d32] opacity-10 rounded-full blur-[120px]"></div>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-32 h-32 rounded-[3rem] bg-white/10 flex items-center justify-center text-5xl text-emerald-400">
            <i className="fa-solid fa-dna"></i>
          </div>
          <div className="max-w-3xl">
            <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">Nota Editorial</h3>
            <p className="text-stone-400 text-xl leading-relaxed font-medium">
              O IMC é um ponto de partida, mas não o diagnóstico final. Atletas com alta densidade muscular podem apresentar resultados elevados sem representar riscos à saúde. Sempre combine esta análise com exames de bioimpedância e orientação médica especializada.
            </p>
          </div>
        </div>
      </div>

      <AdBanner className="mt-24" />
    </div>
  );
};

export default BMICalculator;
