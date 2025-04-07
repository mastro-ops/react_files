import { useState, useEffect } from "react";

export default function ProductsByCategory() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://127.0.0.1:8000/api/product/?category=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [selectedCategory]);

  // Helper function to extract shortcode from category URL
  const getCategoryShortcode = (categoryUrl) => {
    return categoryUrl.split('/').slice(-2)[0]; // Extracts "tops" from ".../category/tops/"
  };

  return (
    <div>
      <h2>Products by Category</h2>
      <label htmlFor="category-select">Select Category: </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">-- Choose a category --</option>
        {categories.map((cat) => (
          <option key={cat.shortcode} value={cat.shortcode}>
            {cat.display_name}
          </option>
        ))}
      </select>
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.url}>
                <td>{product.url}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{getCategoryShortcode(product.category)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
}