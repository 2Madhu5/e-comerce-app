import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const dummyProducts = [
  {
    id: 1,
    name: 'T-Shirt',
    price: 499,
    image: 'https://via.placeholder.com/150?text=T-Shirt',
  },
  {
    id: 2,
    name: 'Jeans',
    price: 999,
    image: 'https://via.placeholder.com/150?text=Jeans',
  },
  {
    id: 3,
    name: 'Shoes',
    price: 1499,
    image: 'https://via.placeholder.com/150?text=Shoes',
  },
];

const Home = () => {
  const [products] = useState(dummyProducts);

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.find((p) => p.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert(`${product.name} added to wishlist`);
    } else {
      alert(`${product.name} is already in your wishlist`);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToWishlist={addToWishlist} />
      ))}
    </div>
  );
};

export default Home;

