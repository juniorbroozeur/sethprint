import type { Metadata } from 'next';
import { isAdmin } from '@/lib/auth';
import { getProducts } from '@/lib/products';
import LoginForm from './LoginForm';
import AdminPanel from './AdminPanel';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin — Seth Print Design',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) return <LoginForm />;
  const products = await getProducts();
  return <AdminPanel products={products} />;
}
