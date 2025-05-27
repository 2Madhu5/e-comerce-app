import React from 'react';

const ProductCard = ({ product, onAddToWishlist }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => onAddToWishlist(product)} style={styles.button}>
        Add to Wishlist
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    width: '200px',
    margin: '10px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductCard;

