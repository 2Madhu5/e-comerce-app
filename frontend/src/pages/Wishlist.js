import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(items);
  }, []);

  return (
    <div>
      <h2>Your Wishlist</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <ProductCard key={product.id} product={product} onAddToWishlist={() => {}} />
          ))
        ) : (
          <p>No items in wishlist</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

