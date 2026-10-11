import 'server-only';
import { createClient } from '@supabase/supabase-js';

export const BUCKET = 'catalogue';

// Client serveur avec la clé service_role : ne JAMAIS l'importer dans un composant client.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans les variables d’environnement');
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
