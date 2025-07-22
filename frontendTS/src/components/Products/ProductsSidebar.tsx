import { useEffect, useState } from 'react';
import axios from 'axios';
import { LinkWithIcon } from '../Navbar/LinkWithIcon';
import './ProductsSidebar.css';
import type { Category } from '../../interface/CategoryInterface';

export function ProductsSidebar({}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/category')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {categories.map((category) => (
          <LinkWithIcon
            key={category._id}
            id={category._id}
            title={category.name}
            link={`/products?category=${category.name}`}
            emoji={`http://localhost:5000/category/${category.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
}
