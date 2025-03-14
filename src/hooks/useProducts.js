import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [skip, search, sort]);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://dummyjson.com/products?limit=10&skip=${skip}`
    );
    let filteredProducts = res.data.products;

    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(prev => (skip === 0 ? filteredProducts : [...prev, ...filteredProducts]));
    setLoading(false);
  };

  return { products, setSkip, search, setSearch, sort, setSort, loading };
};

export default useProducts;
