
import React from 'react';
import AdBanner from './AdBanner';

const SobreNos: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="bg-stone-900 pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-stone-400 text-xs font-black uppercase tracking-[0.4em] mb-6 block">Nosso Manifesto</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
            Saúde com Sabor: <br/> <span className="text-red-500 font-serif italic">Gastronomia Ética</span>
          </h1>
          <p className="text-xl text-stone-400 leading-relaxed font-medium max-w-2xl mx-auto italic">
            "Acreditamos que cozinhar é o ato mais puro de autocuidado."
          </p>
        </div>
      </section>

      <AdBanner />

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-16">
          <div className="prose prose-stone prose-lg max-w-none">
            <h2 className="text-3xl font-black text-stone-800 mb-6 border-l-4 border-red-600 pl-6">Nossa Missão</h2>
            <p className="text-stone-600 leading-relaxed text-xl">
              O <strong>Saúde com Sabor</strong> é um ecossistema independente dedicado a democratizar a nutrição funcional e a alta gastronomia saudável. Nosso objetivo é fornecer informações validadas para que você possa tomar decisões conscientes sobre sua alimentação sem abrir mão do prazer à mesa.
            </p>
          </div>

          <div className="bg-stone-50 p-12 rounded-[3rem] border border-stone-100">
            <h2 className="text-3xl font-black text-stone-800 mb-8">Excelência e Rigor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600 flex-shrink-0">
                  <i className="fa-solid fa-microscope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-2">Base Científica</h4>
                  <p className="text-stone-500 text-sm">Nossos artigos de saúde são baseados em evidências científicas e revisados por especialistas em nutrição.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-stone-800 flex-shrink-0">
                  <i className="fa-solid fa-utensils"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-2">Culinária Testada</h4>
                  <p className="text-stone-500 text-sm">Cada receita passa por um processo de teste para garantir que o resultado final seja nutritivo e delicioso.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-stone-900 p-12 rounded-[3rem] text-white">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-red-500">Transparência</h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-0">
              Somos financiados exclusivamente por publicidade online e parcerias selecionadas. Isso nos permite manter todo o nosso conteúdo e ferramentas gratuitas para nossa comunidade de leitores, mantendo nossa independência editorial.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNos;
