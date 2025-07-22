import { useEffect, useState } from 'react';
import './ProductsList.css';
import axios from 'axios';
import { ProductCard } from './ProductCard';
import type { Product } from '../../interface/ProductInterface';

export function ProductsList({}) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products', {
        params: {
          page: 1,
          perPage: 8,
        },
      })
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option>Relevance</option>
          <option>Price High to Low</option>
          <option>Price Low to High</option>
          <option>Rate High to Low</option>
          <option>Rate Low to High</option>
        </select>
      </header>
      <div className="products_list">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.images[0]}
            price={product.price}
            title={product.title}
            rating={product.reviews.rate}
            ratingCounts={product.reviews.counts}
            stock={product.stock}
          />
        ))}
      </div>
    </section>
  );
}
