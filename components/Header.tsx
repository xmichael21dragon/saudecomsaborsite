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
    { id: 'planner', label: 'Plano Semanal' },
    { id: 'imc', label: 'IMC' },
    { id: 'conversor', label: 'Medidas' },
  ];

  return (
    <header className="sticky top-0 z-[1000] bg-white border-b border-stone-100 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center h-20 md:h-24 justify-between gap-4">
          
          <div className="flex items-center gap-3 cursor-pointer group flex-shrink-0" onClick={() => setView('home')}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md transition-all group-hover:shadow-xl group-hover:scale-105 border border-stone-50 overflow-hidden p-1.5">
              <Logo />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-[900] tracking-tighter uppercase leading-none text-stone-900">
                SAÚDE <span className="text-[#3b82f6]">COM</span> <span className="text-[#ef4444]">SABOR</span>
              </span>
              <span className="text-[9px] font-black tracking-[0.2em] text-stone-400 mt-1 uppercase">Bem-Estar e Gastronomia</span>
            </div>
          </div>

          <nav className="flex items-center overflow-x-auto no-scrollbar gap-1 md:gap-2 flex-grow justify-center px-4">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all
                  ${currentView === item.id 
                    ? 'text-black bg-stone-100' 
                    : 'text-stone-400 hover:text-black hover:bg-stone-50'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            onClick={() => setView('sobre')}
            className={`px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest whitespace-nowrap transition-all shadow-sm
              ${currentView === 'sobre' ? 'bg-stone-800 text-white' : 'bg-stone-900 text-white hover:bg-black'}`}
          >
            Sobre
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;