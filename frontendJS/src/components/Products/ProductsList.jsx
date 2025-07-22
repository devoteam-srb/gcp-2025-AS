import './ProductsList.css';
import ProductCard from './ProductCard';
import useData from '../../hooks/useData';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Common/Pagination';
import { useEffect } from 'react';
import { preprocess } from 'zod';

const ProductsList = () => {
  // const [products, setProducts] = useState([]);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   apiClient
  //     .get('/products')
  //     .then((res) => setProducts(res.data.products))
  //     .catch((err) => setError(err.message));
  // }, []);
  const [search, setSearch] = useSearchParams();
  const category = search.get('category');
  const page = search.get('page');

  const { data, error, isLoading } = useData(
    '/products',
    {
      params: {
        category,
        perPage: 10,
        page,
      },
    },
    [category, page]
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  //ZA PAGINACIJU
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      // console.log('Scroll TOP', scrollTop); //Udaljenost od vrha stranice do tamo gde se mi nalazimo
      // console.log('Client Height', clientHeight); //Vidljiv deo web stranice koji mozemo da vidimo
      // console.log('Scroll Height', scrollHeight); // Cela visina nase stranice STO ZNACI DA SKROLL TOP + CLIENT HEIGHT = SCROLL HEIGHT
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        console.log('Reach to Bottom');
        handlePageChange();
      }
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error"></em>}
        {data?.products &&
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
      {/* ZA PAGINACIJU */}
      {/* {data?.totalProducts && (
        <Pagination
          totalPosts={data.totalProducts}
          postsPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductsList;
