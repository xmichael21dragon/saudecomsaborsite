
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// URL do seu projeto baseada no Ref: shnrsaumtfqhtjcmufhw
const SUPABASE_URL = 'https://shnrsaumtfqhtjcmufhw.supabase.co';

/**
 * A chave 'anon public' foi atualizada com sucesso.
 * Agora o aplicativo pode se comunicar com o seu banco de dados Supabase.
 */
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobnJzYXVtdGZxaHRqY211Zmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNTk1MjEsImV4cCI6MjA4MzgzNTUyMX0.0CrliDufyLl1Y8rU28WqNRTkkgqwagSCRBM99uo-rF0'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
