import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

import UserContext from './context/UserContext';
import Navbar from './components/Navbar/Navbar';
import Routing from './components/Routing/Routing';
import { getUser, getJwt } from './services/userService';
import setAuthToken from './utils/setAuthToken';
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from './services/cartServices';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from './context/CartContext';

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem('token');
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success('Product Added Succesfully!');
      })
      .catch((err) => {
        toast.error('Failed to add product');
        setCart(cart);
      });
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error('Something when wrong');
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error('Something went wrong');
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const prodcutIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    if (type === 'increasse') {
      updatedCart[prodcutIndex].quantity += 1;
      setCart(updatedCart);

      increaseProductAPI(id).catch((err) => {
        toast.error('Something went wrong');
        setCart(oldCart);
      });
    }
    if (type === 'decrease') {
      updatedCart[prodcutIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseProductAPI(id).catch((err) => {
        toast.error('Something went wrong');
        setCart(oldCart);
      });
    }
  };

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
