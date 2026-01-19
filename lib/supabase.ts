
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://shnrsaumtfqhtjcmufhw.supabase.co';

// Chave pública para garantir que o cliente sempre inicialize sem erros.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobnJzYXVtdGZxaHRqY211Zmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNTk1MjEsImV4cCI6MjA4MzgzNTUyMX0.0CrliDufyLl1Y8rU28WqNRTkkgqwagSCRBM99uo-rF0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
