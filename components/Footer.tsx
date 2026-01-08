
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-stone-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2e7d32] to-[#df2a2a] rounded-xl flex items-center justify-center text-white shadow-md">
                <i className="fa-solid fa-leaf text-xl"></i>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-black tracking-tighter leading-none text-stone-800 uppercase">
                  Saúde <span className="text-[#df2a2a]">Com</span>
                </h2>
                <span className="text-md font-black tracking-[0.2em] leading-none text-[#2e7d32]">SABOR</span>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Sua plataforma completa para uma vida mais saudável e saborosa através da culinária consciente e informação de qualidade.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/saudecomsaborr1/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[#df2a2a] hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a 
                href="https://www.facebook.com/403726932816864?ref=_xav_ig_profile_page_web" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[#2e7d32] hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-facebook-f text-lg"></i>
              </a>
              <a 
                href="https://pin.it/46YdLvZow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[#df2a2a] hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-pinterest-p text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6 uppercase tracking-wider text-xs">Categorias</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              <li><a href="#" className="hover:text-[#df2a2a] transition-colors">Nutrição Geral</a></li>
              <li><a href="#" className="hover:text-[#df2a2a] transition-colors">Receitas Emagrecimento</a></li>
              <li><a href="#" className="hover:text-[#2e7d32] transition-colors">Bem-estar Mental</a></li>
              <li><a href="#" className="hover:text-[#2e7d32] transition-colors">Dicas de Saúde</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6 uppercase tracking-wider text-xs">Ferramentas</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              <li><a href="#" className="hover:text-[#2e7d32] transition-colors">Calculadora IMC</a></li>
              <li><a href="#" className="hover:text-[#df2a2a] transition-colors">Planejador Semanal</a></li>
              <li><a href="#" className="hover:text-[#2e7d32] transition-colors">Guia Nutricional</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-xs text-stone-500 mb-4">Receba dicas exclusivas no seu e-mail.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 border-none text-xs focus:ring-2 focus:ring-[#2e7d32]"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#2e7d32] text-white px-3 rounded-xl hover:bg-[#1b5e20] transition-colors">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-100">
          <div className="bg-[#f1f8e9] p-6 rounded-3xl mb-8 border border-[#c8e6c9]">
            <p className="text-[10px] text-[#2e7d32] text-center uppercase font-bold tracking-[0.2em] mb-2">Aviso de Saúde</p>
            <p className="text-xs text-stone-600 text-center leading-relaxed font-medium">
              As informações contidas neste site são para fins educativos e não substituem o aconselhamento médico profissional. 
              Siga nosso trabalho no <a href="https://www.facebook.com/403726932816864" target="_blank" className="text-blue-700 font-bold">Facebook</a>, <a href="https://www.instagram.com/saudecomsaborr1/" target="_blank" className="text-[#df2a2a] font-bold">Instagram</a> e <a href="https://pin.it/46YdLvZow" target="_blank" className="text-red-800 font-bold">Pinterest</a>.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-semibold">
            <p>© 2024 SAÚDE COM SABOR. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-stone-600">Termos de Uso</a>
              <a href="#" className="hover:text-stone-600">Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
