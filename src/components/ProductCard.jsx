import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cart, dispatch } = useCart();
  const inCart = cart.find((item) => item.id === product.id);
  const availableStock = product.stock - (inCart?.quantity || 0);

  const addToCart = () => {
    if (availableStock > 0) {
      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
    }
  };

  const increaseQty = () => {
    if (availableStock > 0) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: product.id, quantity: inCart.quantity + 1 } });
    }
  };

  const decreaseQty = () => {
    if (inCart.quantity > 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: product.id, quantity: inCart.quantity - 1 } });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-xl transition-all transform hover:scale-105 duration-300">
      <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover rounded transition-transform duration-300 hover:scale-110" />
      <h2 className="font-bold text-lg mt-2">{product.title}</h2>
      {availableStock > 0 ? (
        <h2 className="text-green-600 font-semibold">Stock: {availableStock}</h2>
      ) : (
        <p className="text-red-500 font-bold">Currently Unavailable – We’re restocking soon!</p>
      )}
      <h3 className="text-gray-700 font-semibold mt-1">Price: ${product.price}</h3>
      <div className="flex items-center space-x-2 mt-2">
        {inCart ? (
          <>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
              onClick={decreaseQty}
            >
              -
            </button>
            <span className="text-lg font-semibold">{inCart.quantity}</span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
              onClick={increaseQty}
              disabled={availableStock <= 0}
            >
              +
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition shadow-sm"
            onClick={addToCart}
            disabled={availableStock <= 0}
          >
            {availableStock > 0 ? "🛒 Add" : "Out of Stock"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
