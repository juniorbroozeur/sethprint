// Usage : node scripts/hash-password.mjs 'TonMotDePasse'
// Copie la ligne affichée dans .env.local (et dans Vercel).
import { randomBytes, scryptSync } from 'node:crypto';

const pw = process.argv[2];
if (!pw || pw.length < 12) {
  console.error('Donne un mot de passe d’au moins 12 caractères : node scripts/hash-password.mjs \'...\'');
  process.exit(1);
}
const salt = randomBytes(16).toString('hex');
const hash = scryptSync(pw, salt, 64).toString('hex');
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
