import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../Home/HomePage';
import { ProductsPage } from '../Products/ProductsPage';
import { SingleProduct } from '../Products/SingleProduct';
import { SignupPage } from '../Authentication/SignupPage';
import { LoginPage } from '../Authentication/LoginPage';
import { LogoutPage } from '../Authentication/LogoutPage';
import { CartPage } from '../Cart/CartPage';
import { MyOrderPage } from '../MyOrder/MyOrderPage';

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/myorders" element={<MyOrderPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}
