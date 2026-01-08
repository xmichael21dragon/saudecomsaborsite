
import React from 'react';

const SobreNos: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
          alt="Cozinha saudável" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Nossa História</h1>
          <p className="text-xl text-stone-300 leading-relaxed font-light">
            Nascemos da paixão por transformar vidas através da comida de verdade e do conhecimento acessível sobre saúde.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-stone-800 mb-8 uppercase tracking-tighter">
              Saúde <span className="text-[#df2a2a]">Com</span> <span className="text-[#2e7d32]">Sabor</span>
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>
                O <strong>Saúde com Sabor</strong> não é apenas mais um site de receitas. Somos uma comunidade dedicada a provar que comer bem não precisa ser chato, caro ou difícil.
              </p>
              <p>
                Inspirados por plataformas de referência como o Tua Saúde, buscamos unir a ciência da nutrição com a arte da gastronomia. Cada conteúdo em nossa plataforma é cuidadosamente curado para oferecer benefícios reais ao seu corpo e mente.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f1f8e9] p-8 rounded-3xl border border-[#c8e6c9] transform translate-y-8">
              <i className="fa-solid fa-bullseye text-3xl text-[#2e7d32] mb-4"></i>
              <h4 className="font-bold text-stone-800 mb-2">Missão</h4>
              <p className="text-sm text-stone-600">Democratizar o acesso à alimentação saudável e bem-estar através de informação de qualidade.</p>
            </div>
            <div className="bg-[#ffebee] p-8 rounded-3xl border border-[#ffcdd2]">
              <i className="fa-solid fa-eye text-3xl text-[#df2a2a] mb-4"></i>
              <h4 className="font-bold text-stone-800 mb-2">Visão</h4>
              <p className="text-sm text-stone-600">Ser a maior rede de apoio para quem busca longevidade com prazer no Brasil.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Nossos Pilares</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#2e7d32] to-[#df2a2a] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#e8f5e9] rounded-2xl flex items-center justify-center text-[#2e7d32] mx-auto mb-6">
                <i className="fa-solid fa-heart-pulse text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-4">Bem-estar Integral</h3>
              <p className="text-stone-500 text-sm">Olhamos para o ser humano como um todo: físico, mental e emocional.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#ffebee] rounded-2xl flex items-center justify-center text-[#df2a2a] mx-auto mb-6">
                <i className="fa-solid fa-certificate text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-4">Qualidade e Rigor</h3>
              <p className="text-stone-500 text-sm">Conteúdos baseados em fontes confiáveis e revisados por profissionais.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#fff3e0] rounded-2xl flex items-center justify-center text-[#ef6c00] mx-auto mb-6">
                <i className="fa-solid fa-users text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-4">Comunidade</h3>
              <p className="text-stone-500 text-sm">Acreditamos no poder da troca de experiências para sustentar novos hábitos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-stone-800 mb-8">Junte-se à Nossa Jornada</h2>
        <p className="text-stone-600 mb-10 text-lg">
          Estamos apenas começando. Siga-nos nas redes sociais e faça parte desta revolução por uma vida mais colorida e nutritiva.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="https://www.instagram.com/saudecomsaborr1/" 
            target="_blank" 
            className="flex items-center gap-3 bg-[#df2a2a] text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            <i className="fa-brands fa-instagram text-xl"></i> Siga no Instagram
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            <i className="fa-solid fa-envelope text-xl"></i> Fale Conosco
          </a>
        </div>
      </section>
    </div>
  );
};

export default SobreNos;
