import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import { useEffect, useState } from 'react';
import type { Product } from '../../interface/ProductInterface';
import axios from 'axios';
import { QuantityInput } from './QuantityInput';

export function SingleProduct() {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  return (
    <section className="align_center single_product">
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  key={index}
                  className={selectedImage === index ? 'selected_image' : ''}
                  alt={product.title}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className=" single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            <h2 className="quantity_title"> Quantity:</h2>
            <div className="align_center quantity_input">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
              />
            </div>
            <button className="search_button add_cart">Add to cart</button>
          </div>
        </>
      )}
    </section>
  );
}
