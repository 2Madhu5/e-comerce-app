import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7071/api/getproducts')  // Azure Function local endpoint
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.ProductId}>
            {product.Name} - ₹{product.Price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;


