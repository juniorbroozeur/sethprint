import { getProducts } from '@/lib/catalogue-db';
import CatalogueClient from './CatalogueClient';

// Filet de sécurité : la page se régénère au plus toutes les 5 minutes.
// Un ajout depuis l'admin la régénère immédiatement (revalidatePath).
export const revalidate = 300;

export default async function CataloguePage() {
  const products = await getProducts();
  return <CatalogueClient products={products} />;
}
