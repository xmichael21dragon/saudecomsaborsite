
import React, { useState } from 'react';

const WordPressBridge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wp' | 'vercel' | 'code'>('wp');

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-stone-100">
        
        {/* Cabeçalho de Integração */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 pb-12 border-b border-stone-100">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-4xl shadow-lg shadow-orange-100">
            <i className="fa-solid fa-server"></i>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-stone-800 tracking-tighter">Hospedagem GoogieHost</h1>
            <p className="text-stone-500 font-medium">Configure seu banco de dados e backend gratuitamente.</p>
          </div>
        </div>

        {/* Diagrama de Fluxo */}
        <div className="mb-16 bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100">
          <h3 className="text-center text-xs font-black text-stone-400 uppercase tracking-[0.3em] mb-10">Como os dados viajam</h3>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-blue-500 border border-stone-100">
                <i className="fa-solid fa-database text-2xl"></i>
              </div>
              <p className="text-[10px] font-bold uppercase">MySQL (GoogieHost)</p>
            </div>
            <i className="fa-solid fa-arrow-right text-stone-200 hidden md:block"></i>
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-[#217196] rounded-2xl shadow-md flex items-center justify-center mx-auto text-white">
                <i className="fa-brands fa-wordpress text-3xl"></i>
              </div>
              <p className="text-[10px] font-bold uppercase text-[#217196]">WordPress API</p>
            </div>
            <i className="fa-solid fa-arrow-right text-stone-200 hidden md:block"></i>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-black rounded-2xl shadow-sm flex items-center justify-center mx-auto text-white">
                <i className="fa-solid fa-bolt text-2xl"></i>
              </div>
              <p className="text-[10px] font-bold uppercase">React (Vercel)</p>
            </div>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="flex flex-wrap gap-2 mb-12 bg-stone-100 p-2 rounded-2xl">
          <button 
            onClick={() => setActiveTab('wp')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${activeTab === 'wp' ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            1. GoogieHost Setup
          </button>
          <button 
            onClick={() => setActiveTab('vercel')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${activeTab === 'vercel' ? 'bg-white text-black shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            2. Vercel / GitHub
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${activeTab === 'code' ? 'bg-white text-green-600 shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            3. Finalizar Conexão
          </button>
        </div>

        {activeTab === 'wp' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Passo a Passo no GoogieHost</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <p className="font-bold text-stone-800">Crie sua conta Grátis</p>
                      <p className="text-sm text-stone-500">Acesse googiehost.com e registre seu subdomínio (ex: saude.googiehost.com).</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <p className="font-bold text-stone-800">Instale o WordPress</p>
                      <p className="text-sm text-stone-500">No DirectAdmin/cPanel, procure por <strong>Softaculous</strong> e instale o WordPress em um clique. Ele criará o MySQL sozinho.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <p className="font-bold text-stone-800">Plugin ACF</p>
                      <p className="text-sm text-stone-500">Dentro do WordPress, instale o plugin <strong>Advanced Custom Fields</strong> para criar os campos de Calorias e Ingredientes.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-8 rounded-[2rem]">
                <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i> Dica Importante
                </h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  Hospedagens gratuitas como o GoogieHost às vezes bloqueiam acessos externos. Se o site no Vercel não conseguir ler os dados, instale o plugin <strong>"WP REST API CORS"</strong> no seu WordPress para liberar o acesso.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vercel' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-stone-900 text-white p-12 rounded-[2.5rem]">
               <h3 className="text-3xl font-bold mb-6">Por que o Vercel?</h3>
               <p className="text-stone-400 mb-8 leading-relaxed">
                 O GoogieHost é ótimo para o banco de dados, mas o Vercel é infinitamente mais rápido para o site em si (Frontend). Recomendamos manter o site aqui para que suas receitas carreguem em milissegundos.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                   <h5 className="font-bold mb-2">Segurança</h5>
                   <p className="text-xs text-stone-500">O Vercel esconde as rotas sensíveis do seu servidor GoogieHost.</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                   <h5 className="font-bold mb-2">Escalabilidade</h5>
                   <p className="text-xs text-stone-500">Se seu site viralizar, o Vercel aguenta milhões de acessos.</p>
                 </div>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="animate-in fade-in duration-500 space-y-8">
             <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
               <h3 className="text-xl font-bold text-green-800 mb-2">Sua URL da API</h3>
               <p className="text-green-700 text-sm">
                 Se o seu site no GoogieHost é <code>https://saude.orgfree.com</code>, sua URL de API será:
               </p>
               <code className="block mt-4 p-4 bg-white rounded-xl text-green-600 font-mono text-sm border border-green-200">
                 https://saude.orgfree.com/wp-json/wp/v2
               </code>
             </div>
             
             <div className="space-y-4">
               <p className="text-stone-500 text-sm font-bold uppercase tracking-widest">Altere em constants.ts:</p>
               <pre className="bg-stone-900 p-8 rounded-2xl text-blue-300 font-mono text-sm overflow-x-auto shadow-xl">
{`export const WP_CONFIG = {
  baseUrl: 'https://seu-subdominio.googiehost.com/wp-json/wp/v2',
  useExternalAPI: true 
};`}
               </pre>
             </div>
          </div>
        )}

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between p-8 bg-stone-50 rounded-3xl gap-6 border border-stone-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-400 shadow-sm">
              <i className="fa-solid fa-question text-sm"></i>
            </div>
            <p className="text-stone-500 text-sm font-medium">Precisa de ajuda com o cPanel do GoogieHost?</p>
          </div>
          <button className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition-all text-sm shadow-xl shadow-stone-200">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordPressBridge;
