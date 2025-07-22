import './ProductsSidebar.css';
import LinkWithIcon from '../Navbar/LinkWithIcon';
import useData from '../../hooks/useData';

const ProductsSidebar = () => {
  // const [categories, setCategories] = useState([]);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   apiClient
  //     .get('/category')
  //     .then((res) => setCategories(res.data))
  //     .catch((err) => setError(err.message)); //OVO DOLE JE CUSTOM HOOK ZA OVO USTVARI IMA I U PRODUCT LIST
  // }, []);
  const { data: categories, error } = useData('/category');

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <em className="fomr_error">{error}</em>}
        {categories &&
          categories.map((category) => (
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
};

export default ProductsSidebar;
