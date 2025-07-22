import { ProductsList } from './ProductsList';
import './ProductsPage.css';
import { ProductsSidebar } from './ProductsSidebar';

export function ProductsPage({}) {
  return (
    <section className="products_page">
      <ProductsSidebar />
      <ProductsList />
    </section>
  );
}
