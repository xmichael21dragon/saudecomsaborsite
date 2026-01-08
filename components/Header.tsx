
import React from 'react';

interface HeaderProps {
  currentView: string;
  setView: (view: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between py-4 lg:h-20 gap-4">
          
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setView('home')}
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <div className="w-full h-full bg-gradient-to-br from-[#2e7d32] to-[#df2a2a] rounded-xl flex items-center justify-center text-white shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                  <i className="fa-solid fa-leaf text-xl lg:text-2xl drop-shadow-md"></i>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-black tracking-tighter leading-none text-stone-800">
                  SAÚDE <span className="text-[#df2a2a]">COM</span>
                </h1>
                <span className="text-md lg:text-lg font-black tracking-[0.2em] leading-none text-[#2e7d32]">SABOR</span>
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <button onClick={() => setView('wordpress')} className="text-blue-500">
                <i className="fa-brands fa-wordpress text-2xl"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-2xl w-full lg:mx-8">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-stone-400 group-focus-within:text-[#2e7d32] transition-colors">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                placeholder="Buscar receitas no WordPress..."
                className="block w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-transparent rounded-2xl text-sm placeholder-stone-400 focus:bg-white focus:border-[#2e7d32]/20 focus:ring-4 focus:ring-[#2e7d32]/5 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 0 && currentView === 'home') setView('receitas');
                }}
              />
            </div>
          </div>

          <nav className="flex items-center justify-center lg:justify-end gap-1 sm:gap-2">
            <button 
              onClick={() => setView('home')}
              className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-bold transition-colors ${currentView === 'home' ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setView('saude')}
              className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-bold transition-colors ${currentView === 'saude' ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Saúde
            </button>
            <button 
              onClick={() => setView('receitas')}
              className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-bold transition-colors ${currentView === 'receitas' || currentView === 'recipe' ? 'bg-[#ffebee] text-[#df2a2a]' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Receitas
            </button>
            <button 
              onClick={() => setView('wordpress')}
              className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-bold transition-colors ${currentView === 'wordpress' ? 'bg-blue-50 text-blue-600' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              <i className="fa-brands fa-wordpress mr-1"></i> Admin
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
