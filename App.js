import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:4000/Product");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/getProduct", form);
    fetchProducts(); 
    setForm({ name: "", quantity: "", price: "", image: "" });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Product List</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required type="number" />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required type="number" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      <div>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
            <h3>{product.name}</h3>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price}</p>
            {product.image && <img src={product.image} alt={product.name} style={{ width: 100 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
