
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Difficulty, DietType, Recipe, Article } from '../types';
import { supabase } from '../lib/supabase';

interface ContentEditorProps {
  onBack: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onBack }) => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [adminTab, setAdminTab] = useState<'create' | 'manage'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  // Verificar sessão ativa ao carregar
  useEffect(() => {
    // Tenta obter a sessão atual
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
      } catch (err) {
        console.error("Erro ao verificar sessão:", err);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadAdminData = async () => {
    try {
      const [r, a] = await Promise.all([
        supabase.from('recipes').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false })
      ]);
      setAllRecipes((r.data || []) as Recipe[]);
      setAllArticles((a.data || []) as Article[]);
    } catch (err) {
      console.error("Erro ao carregar dados administrativos:", err);
    }
  };

  useEffect(() => {
    if (session) loadAdminData();
  }, [session, adminTab, showSuccess, editingId]);

  const [type, setType] = useState<'recipe' | 'article'>('recipe');

  const initialFormState = {
    title: '',
    description: '',
    image: '',
    image2: '',
    difficulty: Difficulty.EASY,
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    diet: DietType.NONE,
    category: 'Receitas', 
    subcategory: '', 
    ingredients: '',
    instructions: '',
    nutrition: { calories: 300, protein: 20, carbs: 30, fat: 10, fiber: 5 },
    author: 'Equipe Saúde com Sabor'
  };

  const [formData, setFormData] = useState<any>(initialFormState);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);

    // Validação básica se a chave ainda é o placeholder
    // @ts-ignore
    if (supabase.supabaseKey === 'SUA_ANON_KEY_AQUI') {
      setLoginError("Configuração Pendente: Você precisa colar sua 'anon key' no arquivo lib/supabase.ts antes de entrar.");
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setLoginError("E-mail ou senha incorretos. Verifique os dados informados.");
        } else {
          setLoginError(`Erro de conexão: ${error.message}`);
        }
        setLoading(false);
      } else {
        setSession(data.session);
        setLoading(false);
      }
    } catch (err) {
      setLoginError("Ocorreu um erro inesperado ao tentar fazer login.");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'image' | 'image2') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const publicUrl = await uploadFile(file);
      setFormData((prev: any) => ({ ...prev, [target]: publicUrl }));
    } catch (err) {
      alert("Erro ao subir imagem: " + (err as any).message);
    } finally {
      setIsUploading(false);
    }
  };

  const deletePost = async (id: string, postType: 'recipe' | 'article') => {
    if (!confirm("Tem certeza que deseja excluir permanentemente este post?")) return;
    
    const table = postType === 'recipe' ? 'recipes' : 'articles';
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (!error) {
      setShowSuccess("Post removido com sucesso!");
      loadAdminData();
    } else {
      alert("Erro de segurança ao excluir. Verifique as políticas RLS.");
    }
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const publishToSupabase = async () => {
    if (!formData.title || !formData.image) {
      alert("Título e Imagem são obrigatórios.");
      return;
    }

    setIsUploading(true);
    const table = type === 'recipe' ? 'recipes' : 'articles';
    
    const payload = type === 'recipe' ? {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      image2: formData.image2,
      difficulty: formData.difficulty,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      servings: formData.servings,
      diet: formData.diet,
      category: 'Receitas',
      subcategory: formData.subcategory,
      ingredients: typeof formData.ingredients === 'string' ? formData.ingredients.split('\n').filter((i: string) => i.trim() !== '') : formData.ingredients,
      instructions: typeof formData.instructions === 'string' ? formData.instructions.split('\n').filter((i: string) => i.trim() !== '') : formData.instructions,
      nutrition: formData.nutrition,
      author: formData.author
    } : {
      title: formData.title,
      excerpt: formData.description,
      content: formData.instructions,
      image: formData.image,
      image2: formData.image2,
      category: 'Saúde',
      date: new Date().toLocaleDateString('pt-BR'),
      readTime: '7 min',
      author: formData.author
    };

    try {
      let error;
      if (editingId) {
        ({ error } = await supabase.from(table).update(payload).eq('id', editingId));
      } else {
        ({ error } = await supabase.from(table).insert([payload]));
      }

      if (error) throw error;

      setShowSuccess(editingId ? "Atualizado com sucesso!" : "Publicado com sucesso!");
      setFormData(initialFormState);
      setEditingId(null);
      setAdminTab('manage');
    } catch (err) {
      alert("Erro de permissão: Você não tem autorização para gravar no banco.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setShowSuccess(null), 3000);
    }
  };

  const inputStyles = "w-full px-6 py-4 rounded-2xl bg-stone-100 border-2 border-stone-200 focus:border-stone-900 focus:bg-white outline-none transition-all font-bold text-stone-800 placeholder:text-stone-400";
  const labelStyles = "text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1 mb-1 block";

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in bg-stone-50">
        <div className="max-w-md w-full">
          <button onClick={onBack} className="mb-8 text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-all flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Voltar ao site
          </button>
          <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-green-600"></div>
            <div className="text-center mb-10">
               <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                 <i className="fa-solid fa-lock text-2xl"></i>
               </div>
               <h2 className="text-3xl font-black text-stone-800 tracking-tighter leading-none">Acesso Autor</h2>
               <p className="text-stone-400 text-sm font-medium mt-3 italic">Entre para gerenciar seu conteúdo.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className={labelStyles}>E-mail de Acesso</label>
                <input 
                  type="email" 
                  placeholder="exemplo@gmail.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className={inputStyles} 
                  required 
                />
              </div>
              <div>
                <label className={labelStyles}>Senha</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className={inputStyles} 
                  required 
                />
              </div>
              
              {loginError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-shake">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {loginError}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : 'Acessar Painel'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-red-600 transition-all flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> Sair</button>
          <div className="h-4 w-px bg-stone-200"></div>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Editor: <span className="text-stone-800">{session.user.email}</span></p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button onClick={() => { setAdminTab('create'); setEditingId(null); setFormData(initialFormState); }} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'create' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Novo Post</button>
            <button onClick={() => setAdminTab('manage')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'manage' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Gerenciar</button>
          </div>
          <button onClick={handleLogout} className="w-10 h-10 rounded-xl bg-stone-100 text-stone-400 hover:text-red-600 transition-all flex items-center justify-center border border-stone-200" title="Sair do Sistema">
            <i className="fa-solid fa-power-off"></i>
          </button>
        </div>
      </div>

      {adminTab === 'create' ? (
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-2 border-stone-100">
           {showSuccess && (
             <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-xs font-bold border border-emerald-100 mb-8 animate-bounce">
               {showSuccess}
             </div>
           )}
           
           <div className="mb-12">
              <h2 className="text-4xl font-black text-stone-800 tracking-tighter">{editingId ? 'Editar Conteúdo' : 'Nova Publicação'}</h2>
              <div className="flex gap-4 mt-4">
                <button onClick={() => setType('recipe')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest ${type === 'recipe' ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-400'}`}>Receita</button>
                <button onClick={() => setType('article')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest ${type === 'article' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-400'}`}>Artigo</button>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div>
                    <label className={labelStyles}>Título da Publicação</label>
                    <input type="text" className={inputStyles} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyles}>Foto Principal</label>
                      <div onClick={() => !isUploading && fileInputRef1.current?.click()} className="aspect-square rounded-3xl bg-stone-50 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden relative group">
                        {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <i className="fa-solid fa-camera text-3xl text-stone-300 group-hover:text-blue-400"></i>}
                        <input type="file" ref={fileInputRef1} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                      </div>
                    </div>
                    <div>
                      <label className={labelStyles}>Rótulo / Subcategoria</label>
                      <input type="text" className={inputStyles} placeholder="Ex: Sobremesa" value={formData.subcategory} onChange={(e) => setFormData({...formData, subcategory: e.target.value})} />
                    </div>
                 </div>

                 {type === 'recipe' && (
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className={labelStyles}>Dificuldade</label>
                          <select className={inputStyles} value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
                            {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                       </div>
                       <div>
                          <label className={labelStyles}>Dieta</label>
                          <select className={inputStyles} value={formData.diet} onChange={(e) => setFormData({...formData, diet: e.target.value})}>
                            {Object.values(DietType).map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                       </div>
                    </div>
                 )}
              </div>

              <div className="space-y-6">
                 <div>
                    <label className={labelStyles}>{type === 'recipe' ? 'Modo de Preparo (Uma linha por passo)' : 'Conteúdo do Artigo'}</label>
                    <textarea className={`${inputStyles} h-[340px] resize-none font-medium text-base`} value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />
                 </div>
                 {type === 'recipe' && (
                   <div>
                      <label className={labelStyles}>Ingredientes (Um por linha)</label>
                      <textarea className={`${inputStyles} h-[200px] resize-none font-medium text-base`} value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} />
                   </div>
                 )}
              </div>
           </div>

           <div className="mt-12 text-center border-t border-stone-100 pt-10 flex items-center justify-center gap-4">
              <button 
                onClick={publishToSupabase}
                disabled={isUploading}
                className="bg-stone-900 text-white px-16 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl disabled:opacity-50 active:scale-95"
              >
                {isUploading ? <i className="fa-solid fa-spinner animate-spin"></i> : (editingId ? 'Salvar Alterações' : 'Publicar Agora')}
              </button>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...allRecipes, ...allArticles].map(r => (
            <div key={r.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-stone-100 flex gap-5 items-center group shadow-sm hover:shadow-md transition-all">
              <img src={r.image} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-stone-800 truncate mb-1 text-lg leading-tight">{r.title}</h4>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{r.category}</p>
                <div className="flex gap-4 mt-4 pt-3 border-t border-stone-50">
                  <button onClick={() => { setEditingId(r.id); setFormData(r); setAdminTab('create'); }} className="text-[11px] font-black uppercase text-blue-600 hover:text-blue-800 transition-colors">Editar</button>
                  <button onClick={() => deletePost(r.id, (r as any).ingredients ? 'recipe' : 'article')} className="text-[11px] font-black uppercase text-red-500 hover:text-red-700 transition-colors">Excluir</button>
                </div>
              </div>
            </div>
          ))}
          {allRecipes.length === 0 && allArticles.length === 0 && (
            <div className="col-span-full py-20 text-center bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
               <p className="text-stone-400 font-bold">Nenhum post encontrado no banco de dados.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
