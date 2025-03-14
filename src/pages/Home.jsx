import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const Home = () => {
  const { products, setSkip, search, setSearch, sort, setSort, loading } = useProducts();

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select className="border p-2 mb-4" onChange={e => setSort(e.target.value)} value={sort}>
        <option value="">Sort By</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 mt-4" onClick={() => setSkip(prev => prev + 10)}>
        Load More
      </button>
    </div>
  );
};

export default Home;
