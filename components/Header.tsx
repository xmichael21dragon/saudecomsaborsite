import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  currentView: string;
  setView: (view: any) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'receitas', label: 'Receitas' },
    { id: 'saude', label: 'Saúde' },
    { id: 'planner', label: 'Planejador' },
    { id: 'imc', label: 'IMC' },
    { id: 'conversor', label: 'Medidas' },
  ];

  return (
    <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-md border-b border-stone-100 print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center h-20 md:h-24 justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-stone-50 p-1.5 transition-transform group-hover:scale-110">
              <Logo />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-black tracking-tighter uppercase leading-none text-stone-900">
                Saúde <span className="text-[#3b82f6]">com</span> <span className="text-[#ef4444]">Sabor</span>
              </span>
              <span className="text-[9px] font-black tracking-widest text-stone-400 mt-1 uppercase">Nutrição & Gastronomia</span>
            </div>
          </div>

          <nav className="flex items-center overflow-x-auto no-scrollbar gap-2 px-4">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all
                  ${currentView === item.id ? 'text-black bg-stone-100' : 'text-stone-400 hover:text-black hover:bg-stone-50'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={() => setView('sobre')} className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
            Sobre
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;